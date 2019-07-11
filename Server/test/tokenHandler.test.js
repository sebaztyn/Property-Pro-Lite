import 'dotenv/config';
import chai from 'chai';
import path from 'path';
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
  email: 'ifeanyi@yahoo.com',
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
const testUser8 = {
  email: 'curry@yahoo.com',
  first_name: 'steph',
  last_name: 'curry',
  password: 'Qwertyuiop1?',
  phoneNumber: '08032626214',
  address: 'Abuja, Nigeria'
};

describe('Testing Token verification on protected routes', () => {
  let testToken = null;
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(testUser8)
      .end((err, res) => {
        testToken = res.body.data.token;
        if (err) return done(err);
        return done();
      });
  });
  it('should return error 403 when a wrong token is used', (done) => {
    chai.request(server)
      .patch('/api/v1/property/1/sold')
      .set('Authorization', `Bearer ${`${testToken}s`}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status', 'error');
        expect(res.status).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').that.equals('error');
        expect(res.body).to.have.ownProperty('error').to.be.an('string');
        done();
      });
  });
  it('should return error 403 when a NO token is used', (done) => {
    chai.request(server)
      .patch('/api/v1/property/1/sold')
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status', 'error');
        expect(res.status).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').that.equals('error');
        expect(res.body).to.have.ownProperty('error').to.be.an('string');
        done();
      });
  });
});
