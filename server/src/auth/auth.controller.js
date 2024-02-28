import createHttpError from 'http-errors';
import _ from 'lodash';
import { comparePaswords } from '../services/hashPassword.js';
import { getAccessToken, getDecodedToken } from '../services/token.js';
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

// const generateTokens = async (user) => {
//     const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
//     const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET);
//     if (user.refreshTokens == null) {
//         user.refreshTokens = [refreshToken];
//     } else {
//         user.refreshTokens.push(refreshToken);
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