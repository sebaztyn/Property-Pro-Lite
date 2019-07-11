
import '@babel/polyfill';
import { encryptPassword, decryptPassword } from '../helper/encrypt';
import { userResponse, serverResponse } from '../helper/serverResponse';
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

  static async login(req, res) {
    try {
      const { password: userPassword, email } = req.body;
      const columns = `id, first_name, last_name, email, password`;
      const values = `WHERE email='${email}'`;
      const result = await userObject.select(columns, values);
      if (!result.length) return serverResponse(res, 403, ...['status', 'error', 'error', 'Invalid email']);
      const [{ password }] = result;
      const decryptedPassword = await decryptPassword(userPassword, password);
      if (!decryptedPassword) return serverResponse(res, 422, ...['status', 'error', 'error', 'Incorrect Password']);
      const [{
        id, first_name, last_name, phonenumber: phoneNumber
      }] = result;
      const token = generateToken({ id, email, phoneNumber });
      const finalResult = {
        id, token, first_name, last_name, email
      };
      return userResponse(res, 200, finalResult);
    } catch (err) {
      return serverResponse(res, 500, ...['status', 'error', 'error', `Something went wrong. Try again later`]);
    }
  }

  static async passwordReset(req, res) {
    const { email } = req.tokenData;
    try {
      let { password, new_password: newPassword } = req.body;
      const columns = `password AS user_password`;
      const values = `WHERE email='${email}'`;
      const result = await userObject.select(columns, values);
      const decryptedPassword = await decryptPassword(password, result[0].user_password);
      if (decryptedPassword) {
        newPassword = await encryptPassword(newPassword);
        const value = `password='${newPassword}'`;
        const condition = `email = '${email}'`;
        const passwordReset = await userObject.update(value, condition);
        if (passwordReset) return serverResponse(res, 201, ...['status', 204, 'message', 'Password reset successful']);
      }
      return serverResponse(res, 422, ...['status', 'error', 'error', 'Password does not match saved password. Check current password and try again']);
    } catch (err) {
      return serverResponse(res, 500, ...['status', 'error', 'error', `Something went wrong. Try again later`]);
    }
  }
}
