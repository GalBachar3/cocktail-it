import { AsyncRouter } from 'express-async-router';
import { deleteUser, getUsers, updateUser } from './user.controller.js';

const router = AsyncRouter();

router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;