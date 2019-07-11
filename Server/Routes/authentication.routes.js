import { Router } from 'express';
import {
  signupValidator, loginValidator, emailValidator, passwordResetValidator
} from '../middleware/validator';
import { checkToken } from '../middleware/tokenHandler';
import checkEmail from '../middleware/checkEmail';
import userController from '../controllers/authentication.controller';

const router = Router();
router.post('/signup', signupValidator, userController.addUser);
router.post('/signin', loginValidator, userController.login);
router.post('/:userEmail/reset_password', emailValidator, checkEmail, checkToken, passwordResetValidator, userController.passwordReset);

export default router;
