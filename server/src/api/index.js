import { AsyncRouter } from 'express-async-router';
import usersRouter from './users/user.routes.js';
import cocktailsRouter from './cocktails/cocktails.router.js';

const router = AsyncRouter();

router.use('/users', usersRouter);
router.use('/cocktails', cocktailsRouter)

export default router;