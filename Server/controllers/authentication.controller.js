
import '@babel/polyfill';
import { encryptPassword } from '../helper/encrypt';
import { serverError, userResponse, serverResponse } from '../helper/serverResponse';
import { generateToken } from '../middleware/tokenHandler';
import Model from '../models/Model';

const userObject = new Model('users');
export default class UserController {
  static async addUser(req, res) {
    try {
      let {
        email, first_name, last_name, address, phoneNumber
      } = req.body;
      let { password } = req.body;
      password = await encryptPassword(password);
      const columns = `first_name, last_name, email, address, password, phonenumber`;
      const values = `'${first_name}', '${last_name}', '${email}', '${address}', '${password}', '${phoneNumber}'`;
      const result = await userObject.insert(columns, values);
      const { id } = result;
      ({ email, first_name, last_name } = result);
      const token = generateToken({ id, email, phoneNumber });
      const displayResult = {
        token, id, email, first_name, last_name
      };
      return userResponse(res, 201, displayResult);
    } catch (err) {
      return serverResponse(res, 500, ...['status', 'error', 'error', `${err.message}`]);
    }
  }
}
