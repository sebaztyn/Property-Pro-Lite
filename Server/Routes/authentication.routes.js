import { Router } from 'express';
import validator from '../middleware/validator';
import authenticationController from '../controllers/authentication.controller';

const router = Router();
router.post('/signup', validator.signupValidator, authenticationController.addUser);
router.post('/signin', validator.loginValidator, authenticationController.login);

export default router;

