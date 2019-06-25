import 'dotenv/config';
import { config, uploader } from 'cloudinary';

const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });
  return next();
};

export { cloudinaryConfig, uploader };
