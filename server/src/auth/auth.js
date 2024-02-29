import { AsyncRouter } from 'express-async-router';
import validate from '../middlewares/validation.middleware.js';
import { LoginUserValidationSchema, NewUserValidationSchema } from '../api/users/user.validate.js';
import { authUser, loginUser, registerUser, googleSignin } from './auth.controller.js';

const router = AsyncRouter();
/**
* @swagger
* tags:
*   name: Auth
*   description: The Authentication API
*/


/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*/

router.get('/me', authUser);
router.post('/login', validate(LoginUserValidationSchema), loginUser);
/**
* @swagger
* /auth/register:
*   post:
*     summary: registers a new user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The new user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/

router.post('/register', validate(NewUserValidationSchema), registerUser);
router.post("/google", googleSignin);

export default router;