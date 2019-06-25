import { Router } from 'express';
import { signupValidator, loginValidator } from '../middleware/validator';
import { addUser, login } from '../controllers/authentication.controller';

const router = Router();
router.post('/signup', signupValidator, addUser);
router.post('/signin', loginValidator, login);

export default router;
