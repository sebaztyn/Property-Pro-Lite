import '@babel/polyfill';
import { validationResult } from 'express-validator';
import { serverResponse } from '../helper/serverResponse';
import Model from '../models/Model';
import sendMail from '../helper/message';
import generatePassword from '../helper/passwordGenerator';
import { encryptPassword } from '../helper/encrypt';

const userObject = new Model('users');

const checkEmail = async (req, res, next) => {
  if (Object.keys(req.body).length) return next();
  const { userEmail: email } = req.params;
  const password = generatePassword();
  const newPassword = await encryptPassword(password);
  const value = `password='${newPassword}'`;
  const condition = `email = '${email}'`;
  const result = await userObject.update(value, condition);
  if (!Object.keys(result).length) return serverResponse(res, 404, ...['status', 'error', 'error', result]);
  await sendMail(res, result.first_name, password, email);
};

export default checkEmail;
