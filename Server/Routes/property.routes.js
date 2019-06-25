import { Router } from 'express';
import { cloudinaryConfig } from '../config/cloudinaryConfig';
import { multerUploads } from '../middleware/multer';
import { postAdvert, updateAdvert } from '../controllers/property.controller';
import { checkToken } from '../middleware/tokenHandler';
import { propertyValidator } from '../middleware/validator';

const router = Router();

router.post('/', checkToken, cloudinaryConfig, multerUploads, propertyValidator, postAdvert);
router.patch('/:propertyId', checkToken, cloudinaryConfig, multerUploads, propertyValidator, updateAdvert);
router.patch('/:propertyId/sold', checkToken, updateAdvert);


export default router;
