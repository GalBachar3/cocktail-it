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
    
    try {
      const updatedProfile = await UserModel.findByIdAndUpdate(
        userId,
        req.body, 
        { new: true }
      )
  
      if (!updatedProfile) {
        return res.status(404).json({ error: 'profile not found' });
      }
  
      res.status(200).json(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };