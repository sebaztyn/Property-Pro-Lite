import { Router } from 'express';
import { cloudinaryConfig } from '../config/cloudinaryConfig';
import { multerUploads } from '../middleware/multer';
import propController from '../controllers/property.controller';
import { checkToken } from '../middleware/tokenHandler';
import { propertyValidator, parameterValidator } from '../middleware/validator';

const router = Router();

const { postAdvert, updateAdvert, markSold } = propController;

router.post('/', checkToken, cloudinaryConfig, multerUploads, propertyValidator, postAdvert);
router.patch('/:propertyId', checkToken, cloudinaryConfig, multerUploads, parameterValidator, propertyValidator, updateAdvert);
router.patch('/:propertyId/sold', checkToken, parameterValidator, markSold);


export default router;
