import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const getAccessToken = user => jwt.sign(JSON.stringify(user), 'secret');

export const getDecodedToken = token => jwt.verify(token, 'secret');

export const getRefreshToken = user => jwt.sign(JSON.stringify(user),  process.env.JWT_REFRESH_SECRET);