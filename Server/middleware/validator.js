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
const propertySchema = Joi.object().keys({
  price: Joi.number().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  type: Joi.string().required(),
  address: Joi.string().required()
});
const parameterSchema = Joi.object().keys({
  propertyId: Joi.number().integer().required()
});
const emailSchema = Joi.object().keys({
  userEmail: Joi.string().email().regex(/^\S+@\S+\.\S+$/)
});
const paswwordResetSchema = Joi.object().keys({
  newPassword: Joi.string().min(8).max(255)
});
const loginSchema = Joi.object().keys({
  password: Joi.required(),
  email: Joi.string().email().regex(/^\S+@\S+\.\S+$/).required()
});

const errorMessage = (err, res) => {
  const errMessage = err.details[0].message;
  return serverResponse(res, 422, 'status', 'error', 'error', errMessage);
};

const signupValidator = (req, res, next) => {
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
};
const passwordResetValidator = (req, res, next) => {
  const { new_password: newPassword } = req.body;
  const data = { newPassword };
  const minMaxLength = /^[\s\S]{8,255}$/;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharacterRegex = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
  if (minMaxLength.test(newPassword) && uppercaseRegex.test(newPassword) && lowercaseRegex.test(newPassword) && numberRegex.test(newPassword) && specialCharacterRegex.test(newPassword)) {
    return Joi.validate(data, paswwordResetSchema, (err, value) => {
      if (err) {
        return errorMessage(err, res);
      }
      return next();
    });
  }
  return serverResponse(res, 422, 'status', 'error', 'error', 'Invalid password length or values');
};
const emailValidator = (req, res, next) => {
  let { userEmail } = req.params;
  userEmail = userEmail.toLowerCase().trim();
  const data = { userEmail };
  return Joi.validate(data, emailSchema, (err, value) => {
    if (err) return errorMessage(err, res);
    return next();
  });
};
const loginValidator = (req, res, next) => {
  let { email, password } = req.body;
  email = email.toLowerCase().trim();
  password = password.trim();
  const data = { password, email };
  return Joi.validate(data, loginSchema, (err, value) => {
    if (err) {
      return errorMessage(err, res);
    }
    return next();
  });
};
const propertyValidator = (req, res, next) => {
  let { price } = req.body;
  price = Number(price);
  req.body.price = price;

  return Joi.validate(req.body, propertySchema, (err, value) => {
    if (err) {
      return errorMessage(err, res);
    }
    return next();
  });
};
const parameterValidator = (req, res, next) => Joi.validate(req.params, parameterSchema, (err, value) => {
  if (err) return errorMessage(err, res);
  return next();
});

export {
  propertyValidator, signupValidator, loginValidator, parameterValidator, passwordResetValidator, emailValidator
};
