import { Router } from 'express';
import validator from '../middleware/validator';
import authenticationController from '../controllers/authentication.controller';

const router = Router();
router.post('/signup', validator.signupValidator, authenticationController.addUser);

export default router;

