import { UserModel } from '../../models/user.model.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find({});

        return res.json(users);
    } catch (error) {
        next(error)
    }
};

export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    UserModel.findByIdAndDelete(userId, (err, deletedUser) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json();
    });
}

export const updateUser = async (req, res) => {
    const userId = req.params.id;
  
    UserModel.findByIdAndUpdate(
        userId,
        req.body, 
        { new: true },
        (err, updatedUser) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
    
          res.json(updatedUser);
        }
      );
  }