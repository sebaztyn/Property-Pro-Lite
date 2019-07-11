
import debug from 'debug';
import { serverError, serverResponse } from '../helper/serverResponse';
import { imageUpload } from '../middleware/multer';
import Model from '../models/Model';


const logger = debug(`pro-lite-propsController`);
const propModel = new Model('property');

export default class Property {
  static async postAdvert(req, res) {
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
      const columns = `state, city, type, address, price, image_url, owner`;
      const values = `'${state}', '${city}', '${type}', '${address}', '${price}', '${image_url}', '${id}'`;
      const result = await propModel.insert(columns, values);

      return serverResponse(res, 201, ...['status', 'success', 'data', result]);
    } catch (err) {
      return serverError(res);
    }
  }

  static async updateAdvert(req, res) {
    try {
      const propId = Number(req.params.propertyId);
      const { id } = req.tokenData;
      const {
        state, city, address, type, price
      } = req.body;
      let fileUrl = null;
      if (req.file) {
        const imageUrl = await imageUpload(req);
        fileUrl = (imageUrl) || 'https://dummytesturl.com';
      }
      const values = `state='${state}', city='${city}', type='${type}', address='${address}', price= ${price}, image_url='${fileUrl}'`;
      const condition = `owner = ${id} AND id =${propId}`;
      const result = await propModel.update(values, condition);
      if (!result) return serverResponse(res, 404, ...['status', 'error', 'error', `You have no property advert with ID ${propId}. Input a correct property ID and try again`]);
      return serverResponse(res, 200, ...['status', 'success', 'data', result]);
    } catch (err) {
      return serverError(res);
    }
  }

  static async markSold(req, res) {
    try {
      const id = Number(req.params.propertyId);
      const { id: userID } = req.tokenData;
      const values = `status='sold'`;
      const condition = `owner = ${userID} AND id =${id}`;
      const result = await propModel.update(values, condition);
      if (!result) return serverResponse(res, 404, ...['status', 'error', 'error', `You have no property advert with ID ${id}. Input a correct property ID and try again`]);
      return serverResponse(res, 200, ...['status', 'success', 'data', result]);
    } catch (err) {
      return serverError(res);
    }
  }

  static async deleteAdvert(req, res) {
    try {
      const id = Number(req.params.propertyId);
      const { id: userID } = req.tokenData;
      const condition = `owner = ${userID} AND id =${id}`;
      const result = await propModel.delete(condition);
      if (!result) return serverResponse(res, 404, ...['status', 'error', 'error', `Advert not found. Advert may have been removed`]);
      return serverResponse(res, 200, ...['status', 'success', 'data', { message: 'Advert deleted Successfully' }]);
    } catch (err) {
      return serverError(res);
    }
  }

  static async getAllAdverts(req, res) {
    try {
      const columns = `p.id, p.status, p.type, p.state, p.city, p.address, p.price, p.created_on, p.image_url, u.email AS ownerEmail, u.phonenumber AS ownerPhoneNumber`;
      const otherTables = `users`;
      const alias1 = `p`; const alias2 = `u`;
      const condition = `ON u.id=p.owner`;
      const result = await propModel.selectAndJoin(columns, alias1, otherTables, alias2, condition);
      if (!result.length) return serverResponse(res, 404, ...['status', 'error', 'error', `Not Advert found`]);
      return serverResponse(res, 200, ...['status', 'success', 'data', result]);
    } catch (err) {
      return serverError(res);
    }
  }
}
