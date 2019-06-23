// user authentication
import 'dotenv/config';
import Users from '../models/users.model';
import { encryptPassword, decryptPassword } from '../helper/encrypt';
import { serverError, userResponse, serverResponse } from '../helper/serverResponse';
import { generateToken } from '../middleware/tokenHandler';

const authenticationController = {
  async addUser(req, res) {
    try {
      const {
        email, first_name, last_name, address, phoneNumber
      } = req.body;
      let { password } = req.body;

      password = await encryptPassword(password);

      const token = generateToken(req.body);

      const displayResult = Users.addUser({
        email, first_name, last_name, password, phoneNumber, address
      });
      displayResult.token = token;
      return userResponse(res, 201, displayResult);
    } catch (err) {
      return serverError(res);
    }
  },
  async login(req, res) {
    try {
      const { password, email } = req.body;
      const allUsers = Users.findAllUsers();
      const displayResult = allUsers.find(u => u.email === email);
      if (displayResult.email !== email || displayResult.password !== password) {
        return serverResponse(res, 403, 'status', 'error', 'error', 'Invalid email or Password');
      }
      const token = generateToken(displayResult);
      displayResult.token = token;
      return userResponse(res, 201, displayResult);
    } catch (err) {
      return serverError(res);
    }
  }
};

export default authenticationController;
