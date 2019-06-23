import Joi from 'joi';
import { serverResponse } from '../helper/serverResponse';

const signupSchema = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  password: Joi.string().min(8).max(255).required(),
  email: Joi.string().email().regex(/^\S+@\S+\.\S+$/).required(),
  phoneNumber: Joi.string().required(),
  address: Joi.string().required()
});
const loginSchema = Joi.object().keys({
  password: Joi.required(),
  email: Joi.string().email().regex(/^\S+@\S+\.\S+$/).required()
});

const errorMessage = (err, res) => {
  const errMessage = err.details[0].message;
  return serverResponse(res, 422, 'status', 'error', 'error', errMessage);
};

const validation = {
  signupValidator(req, res, next) {
    const { password } = req.body;
    let { email } = req.body;
    email = email.toLowerCase().trim();
    req.body.email = email;
    const minMaxLength = /^[\s\S]{8,255}$/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharacterRegex = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

    if (minMaxLength.test(password) && uppercaseRegex.test(password) && lowercaseRegex.test(password) && numberRegex.test(password) && specialCharacterRegex.test(password)) {
      return Joi.validate(req.body, signupSchema, (err, value) => {
        if (err) {
          return errorMessage(err, res);
        }
        return next();
      });
    }
    return serverResponse(res, 422, 'status', 'error', 'error', 'Invalid password length or values');
  },
  loginValidator(req, res, next) {
    let { email, password } = req.body;
    email = email.toLowerCase().trim();
    password = password.trim();
    req.body.email = email;
    req.body.password = password;
    return Joi.validate(req.body, loginSchema, (err, value) => {
      if (err) {
        return errorMessage(err, res);
      }
      return next();
    });
  }
};

export default validation;
