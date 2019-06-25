import '@babel/polyfill';
import bcrypt from 'bcryptjs';

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
const decryptPassword = async (password, storedPassword) => {
  const checkedPassword = await bcrypt.compare(password, storedPassword);
  return checkedPassword;
};

export { encryptPassword, decryptPassword };
