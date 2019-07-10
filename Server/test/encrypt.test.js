import chai from 'chai';
import { encryptPassword, decryptPassword } from '../helper/encrypt';

const { expect } = chai;
describe('Password Encryption and Password Decryption Tests', () => {
  let testResult = null;
  it('should return a boolean', (done) => {
    encryptPassword("Hello")
      .then((result) => {
        testResult = result;
        try {
          expect(result).to.be.a('string');
          done();
        } catch (err) {
          done(err);
        }
      });
  });
  it('should return a boolean', (done) => {
    decryptPassword('Hello', testResult)
      .then((result) => {
        try {
          expect(result).to.be.a('boolean');
          done();
        } catch (err) {
          done(err);
        }
      });
  });
});
