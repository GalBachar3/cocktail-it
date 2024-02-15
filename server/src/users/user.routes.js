import { AsyncRouter } from 'express-async-router';
import { authUser } from '../auth/auth.controller.js';
import { getUsers } from './user.controller.js';

const router = AsyncRouter();

router.get('/', authUser, getUsers);

export default router;