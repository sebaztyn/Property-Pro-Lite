import { Router } from 'express';
import { cloudinaryConfig } from '../config/cloudinaryConfig';
import { multerUploads } from '../middleware/multer';
import propController from '../controllers/property.controller';
import { checkToken } from '../middleware/tokenHandler';
import { propertyValidator } from '../middleware/validator';

const router = Router();

const { postAdvert } = propController;

router.post('/', checkToken, cloudinaryConfig, multerUploads, propertyValidator, postAdvert);


export default router;
