import multer from 'multer';
import Datauri from 'datauri';
import { uploader } from 'cloudinary/lib/cloudinary';
import path from 'path';
import debug from 'debug';

const logger = debug(`pro-lite-multer`);

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');
const dUri = new Datauri();
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

const imageUpload = (req) => {
  const file = dataUri(req).content;
  return uploader.upload(file)
    .then(result => result.url)
    .catch(err => logger(`${err}`));
};

export { multerUploads, imageUpload };
