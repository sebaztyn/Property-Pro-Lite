// user authentication
import 'dotenv/config';
import Users from '../models/users.model';
import { encryptPassword, decryptPassword } from '../helper/encrypt';
import { serverError, userResponse } from '../helper/serverResponse';
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
      serverError(res);
    }
  }
};

export default authenticationController;
