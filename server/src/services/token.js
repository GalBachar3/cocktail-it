import jwt from 'jsonwebtoken';

const secretKey = 'secret';

export const getAccessToken = user => jwt.sign(JSON.stringify(user), secretKey);

export const getDecodedToken = token => jwt.verify(token, secretKey);