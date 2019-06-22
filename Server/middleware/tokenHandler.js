import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { authResponse } from '../helper/serverResponse';


export const generateToken = userObj => jwt.sign(userObj, process.env.SECRET_KEY);
