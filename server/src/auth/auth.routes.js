import { AsyncRouter } from 'express-async-router';
import validate from '../middlewares/validation.middleware.js';
import { LoginUserValidationSchema, NewUserValidationSchema } from '../users/user.validate.js';
import { authUser, loginUser, registerUser } from './auth.controller.js';

const router = AsyncRouter();

router.get('/me', authUser);
router.post('/login', validate(LoginUserValidationSchema), loginUser);
router.post('/register', validate(NewUserValidationSchema), registerUser);
// router.post('/google', googleAuth);
// router.get('/', googleGet);
export default router;