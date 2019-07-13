import { Router } from 'express';
import {
  signupCheck, loginCheck, emailCheck, passwordCheck, validateInput
} from '../middleware/expressValidator';
import { checkToken } from '../middleware/tokenHandler';
import checkEmail from '../middleware/checkEmail';
import userController from '../controllers/authentication.controller';

const router = Router();
router.post('/signup', signupCheck, validateInput, userController.addUser);
router.post('/signin', loginCheck, validateInput, userController.login);
router.post('/:userEmail/reset_password', emailCheck, validateInput, checkEmail, checkToken, passwordCheck, validateInput, userController.passwordReset);

export default router;
