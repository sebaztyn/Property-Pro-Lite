
import { serverError, serverResponse } from '../helper/serverResponse';
import { imageUpload } from '../middleware/multer';
import propertyObj from '../models/property.model';
import userObj from '../models/users.model';


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
    return serverResponse(res, 201, ...['status', 'success', 'data', displayResult]);
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
    const propArray = propertyObj.findAllProps();
    const propertyData = propArray.find(property => property.id === propId);
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
    return serverResponse(res, 200, ...['status', 'success', 'data', propertyData]);
  } catch (err) {
    return serverError(res);
  }
};

const markSold = (req, res) => {
  try {
    const id = Number(req.params.propertyId);
    const propArray = propertyObj.findAllProps();
    const propToUpdate = propArray.find(property => property.id === id);
    const propIndex = propArray.findIndex(property => property.id === id);
    propToUpdate.status = 'sold';
    propertyObj.updateAdvert(propToUpdate, propIndex);
    return serverResponse(res, 200, ...['status', 'success', 'data', propToUpdate]);
  } catch (err) {
    return serverError(res);
  }
};

const deleteAdvert = (req, res) => {
  try {
    const id = Number(req.params.propertyId);
    const propToDelete = propertyObj.deleteProp(id);
    if (propToDelete) {
      return serverResponse(res, 200, ...['status', 'success', 'data', { message: 'Advert deleted Successfully' }]);
    }
    return serverResponse(res, 404, ...['status', 'error', 'error', 'Advert not found. Advert may have been removed']);

  } catch (err) {
    return serverError(res);
  }
};
const getPropertyType = (arr, type) => {
  const specificPropertyType = arr.filter(property => property.type === type);
  return specificPropertyType;
};
const getAllAdverts = (req, res) => {
  try {
    const allAdverts = propertyObj.findAllProps();
    const allUsers = userObj.findAllUsers();
    const finalList = allAdverts.map((advert) => {
      const ownerID = advert.owner;
      const user = allUsers.find(each => each.id === ownerID);
      advert.ownerEmail = user.email;
      advert.ownerPhoneNumber = user.phoneNumber;
      const { owner, ...finalResult } = advert;
      return finalResult;
    });
    if (req.query.type) {
      const { type } = req.query;
      const queryResult = getPropertyType(finalList, type);
      if (queryResult.length) return serverResponse(res, 200, ...['status', 'success', 'data', queryResult]);
      throw new Error('Enter a valid value and try again.');
    }
    return serverResponse(res, 200, ...['status', 'success', 'data', finalList]);
  } catch (err) {
    return serverError(res);
  }
};

const getOneAdvert = (req, res) => {
  try {
    const id = Number(req.params.propertyId);
    if (!id) throw new Error('Invalid Advert ID');
    const result = propertyObj.findOne(id);
    if (!result) return serverResponse(res, 404, ...['status', 'error', 'error', 'No result found. Enter a valid value and try again.']);
    const advertOwnerID = result.owner;
    const userList = userObj.findAllUsers();
    const advertOwner = userList.find(user => user.id === advertOwnerID);
    result.ownerEmail = advertOwner.email;
    result.ownerPhoneNumber = advertOwner.phoneNumber;
    const { owner, ...finalResult } = result;
    return serverResponse(res, 200, ...['status', 'success', 'data', finalResult]);
  } catch (err) {
    return serverError(res);
  }
};

export {
  postAdvert, updateAdvert, markSold, deleteAdvert, getAllAdverts, getOneAdvert
};
