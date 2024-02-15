import { UserModel } from './user.model.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find({});

        return res.json(users);
    } catch (error) {
        next(error)
    }
};