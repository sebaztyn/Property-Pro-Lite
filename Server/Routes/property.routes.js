import { Router } from 'express';
import { cloudinaryConfig } from '../config/cloudinaryConfig';
import { multerUploads } from '../middleware/multer';
import propController from '../controllers/property.controller';
import { checkToken } from '../middleware/tokenHandler';
import {
  propertyCheck, parameterCheck, validateInput
} from '../middleware/expressValidator';

const router = Router();

const {
  postAdvert, updateAdvert, markSold, getOneAdvert, getAllAdverts, deleteAdvert
} = propController;

router.post('/', checkToken, cloudinaryConfig, multerUploads, propertyCheck, validateInput, postAdvert);
router.patch('/:propertyId', checkToken, parameterCheck, validateInput, cloudinaryConfig, multerUploads, propertyCheck, validateInput, updateAdvert);
router.patch('/:propertyId/sold', checkToken, parameterCheck, validateInput, markSold);
router.delete('/:propertyId', checkToken, parameterCheck, validateInput, deleteAdvert);
router.get('/', checkToken, getAllAdverts);
router.get('/:propertyId', checkToken, parameterCheck, validateInput, getOneAdvert);


export default router;
