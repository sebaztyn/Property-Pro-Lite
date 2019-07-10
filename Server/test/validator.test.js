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
  it('should return an error status code 422 if the password is invalid - NEW USER ENDPOINT', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(testUser4)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(422);
        expect((res.body)).to.be.an('object');
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body)).to.haveOwnProperty('status').that.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.a('string');
        expect((res.body.error)).to.be.a('string');
        return done();
      });
  });
  it('should return an error status code 403 if the email already exists - NEW USER ENDPOINT', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(testUser3)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(500);
        expect((res.body)).to.be.an('object');
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body)).to.haveOwnProperty('status').that.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.a('string');
        expect((res.body)).to.haveOwnProperty('error').that.equals('duplicate key value violates unique constraint "users_email_key"');
        expect((res.body.error)).to.be.a('string');
        return done();
      });
  });
  it('should return an error status code 422 if the email is invalid - NEW USER ENDPOINT', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(testUser5)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(422);
        expect((res.body)).to.be.an('object');
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body)).to.haveOwnProperty('status').that.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.a('string');
        expect((res.body.error)).to.be.a('string');
        return done();
      });
  });
  it('should return an error status code 422 if the first name field is empty - NEW USER ENDPOINT', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(testUser6)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(422);
        expect((res.body)).to.be.an('object');
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body)).to.haveOwnProperty('status').that.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.a('string');
        expect((res.body.error)).to.be.a('string');
        return done();
      });
  });
  it('should return an error status code 422 if the last name field is empty - NEW USER ENDPOINT', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(testUser7)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(422);
        expect((res.body)).to.be.an('object');
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body)).to.haveOwnProperty('status').that.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.a('string');
        expect((res.body.error)).to.be.a('string');
        return done();
      });
  });
  it('should return an error status code 422 if the password is invalid - SIGNIN ENDPOINT', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'james@yahoo.com',
        password: 'qwertyuiop1?'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(422);
        expect((res.body)).to.be.an('object');
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body)).to.haveOwnProperty('status').that.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.a('string');
        expect((res.body.error)).to.be.a('string');
        return done();
      });
  });
  it('should return an error status code 422 if the password field is empty - SIGNIN ENDPOINT', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'james@yahoo.com',
        password: ''
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(422);
        expect((res.body)).to.be.an('object');
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body)).to.haveOwnProperty('status').that.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.a('string');
        expect((res.body.error)).to.be.a('string');
        return done();
      });
  });
  it('should return an error status code 422 if the email is invalid - SIGNIN ENDPOINT', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'jame',
        password: 'Qwertyuiop1?'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(422);
        expect((res.body)).to.be.an('object');
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body)).to.haveOwnProperty('status').that.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.a('string');
        expect((res.body.error)).to.be.a('string');
        return done();
      });
  });
  it('should return an error status code 422 if the email field is empty - SIGNIN ENDPOINT', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'jame',
        password: 'Qwertyuiop1?'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(422);
        expect((res.body)).to.be.an('object');
        expect((res.body)).to.have.all.keys('status', 'error');
        expect((res.body)).to.haveOwnProperty('status').that.equals('error');
        expect((res.body)).to.haveOwnProperty('error').that.is.a('string');
        expect((res.body.error)).to.be.a('string');
        return done();
      });
  });
});
