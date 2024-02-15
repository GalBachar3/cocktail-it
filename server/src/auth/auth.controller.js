import createHttpError from 'http-errors';
import _ from 'lodash';
import { comparePaswords } from '../services/hashPassword.js';
import { getAccessToken, getDecodedToken } from '../services/token.js';
import { UserModel } from '../users/user.model.js';

const findUserByUsername = async username => await UserModel.findOne({ username });

export const registerUser = async ({ body }, res, next) => {
    try {
        const user = await findUserByUsername(body.username);

        if (user) {
            throw createHttpError(400, 'Username already in use')
        }

        body.name = body.name.replace(/\s+/g, ' ').trim().toLowerCase().split(' ').map(x => _.upperFirst(x)).join(' ');
        const newUser = new UserModel(body);
        newUser.save();

        return res.status(200).json(newUser);
    } catch (error) {
        next(error)
    }
};

export const loginUser = async ({ body: { username, password } }, res, next) => {
    try {
        const user = await findUserByUsername(username);

        if (user) {
            const match = await comparePaswords(password, user.password);

            if (match) {
                return res.json({ accessToken: getAccessToken(user), user });
            }
            throw createHttpError(400, 'Invalid Credentials');
        }

        throw createHttpError(400, 'User doesn\'t exists');

    } catch (error) {
        next(error)
    }
};

export const authUser = async ({ headers: { authorization } }, res, next) => {
    try {
        if (authorization) {
            const token = authorization.split(' ')[1];

            const user = getDecodedToken(token);

            if (_.isObject(user)) {
                res.locals.userId = user._id;
                return next();
            } else {
                throw createHttpError(400, 'Wrong User Token');
            }
        } else {
            throw createHttpError(400, 'No authorization');
        }
    } catch (error) {
        next(error)
    }
};

// export const googleAuth = async (req, res, next) => {
//     res.header('Access-Control-Aloow-Origin', 'http://localhost:5173/');
//     res.header('Referrer-Policy', 'no-referrer-when-downgrade');

//     const redirectUrl = 'http://127.0.0.1:3000/oauth';
//     const oAuth2Client = new OAuth2Client(
//         process.env.CLIENT_ID,
//         process.env.CLIENT_SECRET,
//         redirectUrl
//     );

//     const authorizeUrl = oAuth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
//         prompt: 'consent'
//     })

//     res.json({ url: authorizeUrl })
// };

// export const getUserData = async access_token => {
//     const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`);
//     const data = await response.json();
//     console.log('data', data);
// };

// export const googleGet = async (req, res, next) => {
//     const code = req.query.code;
//     try {
//         const redirectUrl = 'http://127.0.0.1:3000/oauth';
//         const oAuth2Client = new OAuth2Client(
//             process.env.CLIENT_ID,
//             process.env.CLIENT_SECRET,
//             redirectUrl
//         );
//         const res = await oAuth2Client.getToken(code);
//         await oAuth2Client.setCredentials(res.token);
//         console.log('token acquired');
//         const user = oAuth2Client.credentials;
//         console.log('credentials', user);
//         await getUserData(user.access_token)
//     } catch (e) {
//         console.log('Error with signing in with Google');
//     }
// }