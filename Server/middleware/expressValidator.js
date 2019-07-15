import { body, param, validationResult } from 'express-validator';
import { serverResponse } from '../helper/serverResponse';

const signupCheck = [
  body('first_name').trim().not().isEmpty()
    .withMessage('First name field is required'),
  body('last_name').trim().not().isEmpty()
    .withMessage('Last name field is required'),
  body('email').trim().not().isEmpty()
    .withMessage('Email field is required')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid Email'),
  body('password').not().isEmpty().withMessage('Password field is required')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
    .withMessage('Password must be a combination one lowercase, one uppercase, a number, a special character and at least 8 characters long'),
  body('phoneNumber').trim().not().isEmpty()
    .withMessage('phone number field is required'),
  body('address').trim().not().isEmpty()
    .withMessage('Address field is required')
];
const propertyCheck = [
  body('state').trim().not().isEmpty()
    .withMessage('State field is required'),
  body('city').trim().not().isEmpty()
    .withMessage('City field is required'),
  body('address').trim().not().isEmpty()
    .withMessage('Address field is required'),
  body('type').trim().not().isEmpty()
    .withMessage('Property Type field is required'),
  body('price').trim().not().isEmpty()
    .withMessage('phone number field is required')
    .isNumeric()
    .withMessage('Price must be numbers')
];
const emailCheck = [
  param('userEmail').trim().not().isEmpty()
    .withMessage('Email field is required')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid Email')
];
const passwordCheck = [
  body('new_password').not().isEmpty().withMessage('Password field is required')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
    .withMessage('Password must be a combination one lowercase, one uppercase, a number, a special character and at least 8 characters long')
];
const loginCheck = [
  body('email').trim().not().isEmpty()
    .withMessage('Email field is required')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid Email'),
  body('password').not().isEmpty().withMessage('Password field is required')
];
const parameterCheck = [param('propertyId').not().isEmpty().withMessage('propertyID field is required')
  .isNumeric()
  .withMessage('PropertyID must be a number')];

const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array()[0].msg;
    return serverResponse(res, 422, 'status', 'error', 'error', errorMessage);
  }
  return next();
};
export {
  signupCheck, loginCheck, emailCheck, passwordCheck, propertyCheck, parameterCheck, validateInput
};
