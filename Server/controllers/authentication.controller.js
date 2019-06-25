// user authentication
import 'dotenv/config';
import userObj from '../models/users.model';
import { encryptPassword, decryptPassword } from '../helper/encrypt';
import { serverError, userResponse, serverResponse } from '../helper/serverResponse';
import { generateToken } from '../middleware/tokenHandler';

const addUser = async (req, res) => {
  try {
    const {
      email, first_name, last_name, address, phoneNumber
    } = req.body;
    let { password } = req.body;
    const allUsers = userObj.findAllUsers();
    const userIndex = allUsers.findIndex(user => user.email === email);
    if (userIndex > -1) return serverResponse(res, 403, 'status', 'error', 'error', 'Action Forbidden. User already exist');
    password = await encryptPassword(password);
    const displayResult = userObj.addUser({
      email, first_name, last_name, password, phoneNumber, address
    });
    const { id, email: userEmail } = displayResult;
    const token = generateToken({ id, userEmail });
    displayResult.token = token;
    return userResponse(res, 201, displayResult);
  } catch (err) {
    return serverError(res);
  }
};
const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const alluserObj = userObj.findAllUsers();
    const displayResult = alluserObj.find(u => u.email === email);
    if (displayResult.email !== email) {
      return serverResponse(res, 403, 'status', 'error', 'error', 'Invalid email or Password');
    }
    const decryptedPassword = await decryptPassword(password, displayResult.password);
    if (!decryptedPassword) {
      return serverResponse(res, 422, 'status', 'error', 'error', 'Incorrect Password');
    }
    const token = generateToken(displayResult);
    displayResult.token = token;
    return userResponse(res, 201, displayResult);
  } catch (err) {
    return serverError(res);
  }
};

export { addUser, login };
