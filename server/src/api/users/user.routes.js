import { AsyncRouter } from 'express-async-router';
import { deleteUser, getUsers, updateUser } from './user.controller.js';
import { protect } from "../../middlewares/auth.middleware.js";

const router = AsyncRouter();

router.get('/', getUsers);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

export default router;