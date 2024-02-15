import express from 'express';
import authRouter from './auth/auth.routes.js';
import userRouter from './users/user.routes.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;