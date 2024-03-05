import { AsyncRouter } from 'express-async-router';
import usersRouter from './users/user.routes.js';
import cocktailsRouter from './cocktails/cocktails.router.js';
import fileRoute  from './uploadRoutes.js';

const router = AsyncRouter();

router.use('/users', usersRouter);
router.use('/cocktails', cocktailsRouter);
router.use('/file', fileRoute);

export default router;