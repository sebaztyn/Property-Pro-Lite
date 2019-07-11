import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import debug from 'debug';
import server from '../app';

const logger = debug(`pro-lite-test`);
const { expect } = chai;
chai.use(chaiHttp);

const testUser3 = {
  email: 'james@yahoo.com',
  first_name: 'james',
  last_name: 'awarga',
  password: 'Qwertyuiop1?',
  phoneNumber: '08032626214',
  address: 'Abuja, Nigeria'
};
const testUser4 = {
  // email: 'ifeanyi@yahoo.com',
  first_name: 'ifeanyi',
  last_name: 'okorie',
  password: 'Qwertyuiop1',
  phoneNumber: '08032626214',
  address: 'Abuja Nigeria'
};
const testUser5 = {
  email: 'emmayahoo.com',
  first_name: 'Emmanuel',
  last_name: 'Lawrence',
  password: 'Qwertyuiop1?',
  phoneNumber: '080123456879',
  address: 'Lagos, Nigeria'
};
const testUser6 = {
  email: 'emma@yahoo.com',
  first_name: '',
  last_name: 'Lawrence',
  password: 'Qwertyuiop1?',
  phoneNumber: '080123456879',
  address: 'Lagos, Nigeria'
};
const testUser7 = {
  email: 'emma@yahoo.com',
  first_name: 'Emmanuel',
  last_name: '',
  password: 'Qwertyuiop1?',
  phoneNumber: '080123456879',
  address: 'Lagos, Nigeria'
};

describe('Testing User SIGNUP/LOGIN and PASSWORD RESET validators', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(testUser3)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should retrieve ALL properties of A SPECIFIC PROPERTY TYPE', (done) => {
    chai.request(server)
      .get('/api/v1/property?type=2-bedrooms')
      .end((err, res) => {
        if (err) done(err);
        expect(res.status).to.equal(403);
        expect((res.body)).to.be.an('object');
        done();
      });
  });
});
