import { Router } from 'express';
import { cloudinaryConfig } from '../config/cloudinaryConfig';
import { multerUploads } from '../middleware/multer';
import {
  postAdvert, updateAdvert, markSold, deleteAdvert, getAllAdverts, getOneAdvert
} from '../controllers/property.controller';
import { checkToken } from '../middleware/tokenHandler';
import { propertyValidator } from '../middleware/validator';

const router = Router();

router.post('/', checkToken, cloudinaryConfig, multerUploads, propertyValidator, postAdvert);
router.patch('/:propertyId', checkToken, cloudinaryConfig, multerUploads, propertyValidator, updateAdvert);
router.patch('/:propertyId/sold', checkToken, markSold);
router.delete('/:propertyId', checkToken, deleteAdvert);
router.get('/', getAllAdverts);
router.get('/:propertyId', getOneAdvert);


export default router;
