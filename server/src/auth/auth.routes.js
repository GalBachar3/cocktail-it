import { AsyncRouter } from 'express-async-router';
import validate from '../middlewares/validation.middleware.js';
import { LoginUserValidationSchema, NewUserValidationSchema } from '../api/users/user.validate.js';
import { authUser, loginUser, registerUser, googleSignin, refresh, logout } from './auth.controller.js';

const router = AsyncRouter();

router.get('/me', authUser);
router.post('/login', validate(LoginUserValidationSchema), loginUser);
router.post('/register', validate(NewUserValidationSchema), registerUser);
router.post("/google", googleSignin);
router.post('/refreshToken', refresh);
router.get('/logout', logout);
export default router;