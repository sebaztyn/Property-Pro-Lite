
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
const updateAdvert = async (req, res) => {
  try {
    let image_url;
    if (req.file) {
      const fileUrl = await imageUpload(req);
      if (!fileUrl) image_url = 'https://dummytesturl.com';
      else image_url = fileUrl;
    }
    const propId = Number(req.params.propertyId);
    const propArray = propertyObj.findAllUsers();
    const propToUpdate = propArray.filter(property => property.id === propId);
    const propertyData = propToUpdate[0];
    const propIndex = propArray.findIndex(property => property.id === propId);
    const {
      state, city, address, type, price
    } = req.body;
    propertyData.state = (propertyData.state === state) ? propertyData.state : state;
    propertyData.price = (propertyData.price === price) ? propertyData.price : price;
    propertyData.city = (propertyData.city === city) ? propertyData.city : city;
    propertyData.address = (propertyData.address === address) ? propertyData.address : address;
    propertyData.image_url = (propertyData.image_url === image_url) ? propertyData.image_url : image_url;
    propertyData.type = (propertyData.type === type) ? propertyData.type : type;
    propertyObj.updateAdvert(propertyData, propIndex);
    return serverResponse(res, 201, 'status', 'success', 'data', propertyData);
  } catch (err) {
    return serverError(res);
  }
};

export { postAdvert, updateAdvert };
