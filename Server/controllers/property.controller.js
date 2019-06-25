
import { serverError, serverResponse } from '../helper/serverResponse';
import { imageUpload } from '../middleware/multer';
import propertyObj from '../models/property.model';


const postAdvert = async (req, res) => {
  try {
    const { id } = req.tokenData;
    let image_url;
    if (req.file) {
      const fileUrl = await imageUpload(req);
      if (!fileUrl) image_url = 'https://dummytesturl.com';
      else image_url = fileUrl;
    }
    const {
      state, city, address, type, price
    } = req.body;
    const displayResult = propertyObj.postAdvert({
      owner: id,
      price,
      state,
      city,
      image_url,
      type,
      address
    });
    return serverResponse(res, 201, 'status', 'success', 'data', displayResult);
  } catch (err) {
    return serverError(res);
  }
};

export { postAdvert };
