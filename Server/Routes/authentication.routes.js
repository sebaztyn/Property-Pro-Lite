import { Router } from 'express';
import { signupValidator } from '../middleware/validator';
import userController from '../controllers/authentication.controller';

const router = Router();
router.post('/signup', signupValidator, userController.addUser);

export default router;
