import { Router } from './node_modules/express';
import { signupValidator, loginValidator } from '../middleware/validator';
import userController from '../controllers/authentication.controller';

const router = Router();
router.post('/signup', signupValidator, userController.addUser);
router.post('/signin', loginValidator, userController.login);

export default router;
