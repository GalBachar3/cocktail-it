import { AsyncRouter } from 'express-async-router';
import { getUsers } from './user.controller.js';

const router = AsyncRouter();

router.get('/', getUsers);

export default router;