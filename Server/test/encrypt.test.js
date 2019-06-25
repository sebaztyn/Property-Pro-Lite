import chai from 'chai';
import { encryptPassword, decryptPassword } from '../helper/encrypt';

const { expect } = chai;


describe('Password Encryption and Password Decryption Tests', async () => {
  const result = await encryptPassword("Hello");
  const decryptResult = await decryptPassword('Hello', result);

  it('should return a boolean', () => {
    expect(result).to.be.a('string');
  });
  it('should return a boolean', () => {
    expect(decryptResult).to.be.a('boolean');
  });
});
