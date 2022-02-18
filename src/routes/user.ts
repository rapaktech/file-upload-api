import express from 'express';
import { body } from 'express-validator';
import { createUser, loginUser } from './../controllers/user';

const router = express.Router();

router.post('/api/v1/users/create', body('fullName').isLength({ min: 5 }), body('email').isEmail(), body('password').isStrongPassword(), createUser);
router.post('/api/v1/users/login', body('email').isEmail(), body('password').isStrongPassword(), loginUser);

export { router };