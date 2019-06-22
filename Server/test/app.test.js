import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('TESTING AUTHENTICATION ENDPOINTS', () => {
  it('should post new user data to the database', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'sebastinocj@yahoo.com',
        first_name: 'Chima',
        last_name: 'Ekeneme',
        password: 'Qwertyuiop1!',
        phoneNumber: '08032626214',
        address: 'Gwarinpa, Abuja'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.haveOwnProperty('status');
        expect(res.status).to.equal(201);
        expect((res.body)).to.be.an('object');
        expect((res.body)).to.have.all.keys('status', 'data');
        expect((res.body)).to.haveOwnProperty('status').that.equals('success');
        expect((res.body)).to.haveOwnProperty('status').that.is.a('string');
        expect((res.body)).to.haveOwnProperty('data').that.is.an('object');
        expect((res.body.data)).to.be.an('object');
        expect((res.body.data.email)).to.be.a('string');
        expect((res.body.data.first_name)).to.be.a('string');
        expect((res.body.data.last_name)).to.be.a('string');
        expect((res.body.data.token)).to.be.a('string');
        expect((res.body.data.id)).to.be.a('number');
        done();
      });
  });
});
