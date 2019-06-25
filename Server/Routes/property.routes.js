import { Router } from 'express';
import { cloudinaryConfig } from '../config/cloudinaryConfig';
import { multerUploads } from '../middleware/multer';
import { postAdvert } from '../controllers/property.controller';
import { checkToken } from '../middleware/tokenHandler';
import { propertyValidator } from '../middleware/validator';

const router = Router();

router.post('/', checkToken, cloudinaryConfig, multerUploads, propertyValidator, postAdvert);


export default router;
