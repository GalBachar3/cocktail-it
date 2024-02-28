import createHttpError from 'http-errors';
import _ from 'lodash';
import { comparePaswords } from '../services/hashPassword.js';
import { getAccessToken, getDecodedToken, getRefreshToken } from '../services/token.js';
import { UserModel } from '../models/user.model.js';
import { OAuth2Client } from 'google-auth-library';

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
                const refreshToken = getRefreshToken(user);
                if (!user.refreshTokens) {
                    user.refreshTokens = [refreshToken];
                } else {
                    user.refreshTokens.push(refreshToken);
                }
                await user.save();

                return res.json({ accessToken: getAccessToken(user), refreshToken, user});
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

// const generateTokens = async (user) => {
//     const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
//     const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET);
//     if (user.refreshTokens == null) {
//         user.refreshTokens = [refreshToken];
//     } else {
//         user.refreshTokens.push(refreshToken);

export const refreshToken = (req, res) => {
    const authHeader = req.headers['authorization'];
    //TODO: debug here
    const refreshToken = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (refreshToken == null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(401);
        }
        try {
            const userDb = await UserModel.findOne({ '_id': user._id });
            if (!userDb.refreshTokens || !userDb.refreshTokens.includes(refreshToken)) {
                userDb.refreshTokens = [];
                await userDb.save();
                return res.sendStatus(401);
            }
            const accessToken = getAccessToken(user)
            const newRefreshToken = getRefreshToken(user)
            userDb.refreshTokens = userDb.refreshTokens.filter(t => t !== refreshToken);
            userDb.refreshTokens.push(newRefreshToken);
            await userDb.save();
            return res.status(200).send({
                'accessToken': accessToken,
                'refreshToken': refreshToken
            });
        } catch (err) {
            res.sendStatus(401).send(err.message);
        }
    });
}

export const logout = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (refreshToken == null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(401);
        try {
            const userDb = await UserModel.findOne({ '_id': user._id });
            if (!userDb.refreshTokens || !userDb.refreshTokens.includes(refreshToken)) {
                userDb.refreshTokens = [];
                await userDb.save();
                return res.sendStatus(401);
            } else {
                userDb.refreshTokens = userDb.refreshTokens.filter(t => t !== refreshToken);
                await userDb.save();
                return res.sendStatus(200);
            }
        } catch (err) {
            res.sendStatus(401).send(err.message);
        }
    });
}

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
//     await user.save();
//     return {
//         'accessToken': accessToken,
//         'refreshToken': refreshToken
//     };
// }

const client = new OAuth2Client();
export const googleSignin = async (req, res) => {
    console.log("dsdsdssd",req.body);
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const email = payload?.email;
        if (email != null) {
            let user = await UserModel.findOne({ 'email': email });
            if (user == null) {
                console.log('sss',email)
                user = await UserModel.create(
                    {
                        'name' : '',
                        'username': '',
                        'email': email,
                        'password': '0',
                        'image': payload?.picture
                    });
            }
            //const tokens = await generateTokens(user)
            return res.json({ accessToken: getAccessToken(user), user });
        }
    } catch (err) {
        return res.status(400).send(err.message);
    }
}