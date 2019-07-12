import { body, param, validationResult } from 'express-validator';
import { serverResponse } from '../helper/serverResponse';

const signupCheck = [
  body('first_name').not().isEmpty().withMessage('First name field is required')
    .isAlpha()
    .withMessage('First name must be alphabets only'),
  body('last_name').not().isEmpty().withMessage('Last name field is required')
    .isAlpha()
    .withMessage('Last name must be alphabets only'),
  body('email', 'Email field is required').not().isEmpty().withMessage('Email field is required')
    .isEmail()
    .withMessage('Invalid Email'),
  body('password').not().isEmpty().withMessage('Password field is required')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
    .withMessage('Password must be a combination one lowercase, one uppercase, a number, a special character and at least 8 characters long'),
  body('phoneNumber').not().isEmpty().withMessage('phone number field is required'),
  body('address').not().isEmpty().withMessage('Address field is required')
];
const propertyCheck = [
  body('state').not().isEmpty().withMessage('State field is required')
    .isAlpha()
    .withMessage('State must be alphabets only'),
  body('city').not().isEmpty().withMessage('City field is required')
    .isAlpha()
    .withMessage('City must be alphabets only'),
  body('address').not().isEmpty().withMessage('Address field is required'),
  body('type').not().isEmpty().withMessage('Property Type field is required'),
  body('price').not().isEmpty().withMessage('phone number field is required')
    .isNumeric()
    .withMessage('Price must be numbers')
];
const emailCheck = [
  param('userEmail').not().isEmpty().withMessage('Email field is required')
    .isEmail()
    .withMessage('Invalid Email')
];
const passwordCheck = [
  body('new_password').not().isEmpty().withMessage('Password field is required')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
    .withMessage('Password must be a combination one lowercase, one uppercase, a number, a special character and at least 8 characters long')
];
const loginCheck = [
  body('email', 'Email field is required').not().isEmpty().withMessage('Email field is required')
    .isEmail()
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
