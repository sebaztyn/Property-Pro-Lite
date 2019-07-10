
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
      logger(`${err}`);
      return serverError(res);
    }
  }
}
