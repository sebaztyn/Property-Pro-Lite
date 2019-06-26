import 'dotenv/config';
import path from 'path';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const { expect } = chai;
chai.use(chaiHttp);


let testToken = null;
describe('TESTING AUTHENTICATION ENDPOINTS', () => {
  it('should welcome you to the Applications endpoint page', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        if (err) return done(err);
        expect((res.text)).to.be.a('string');
        done();
      });
  });
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
        testToken = res.body.data.token;
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
  it('should allow user saved in the database access to the login page', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'sebastinocj@yahoo.com',
        password: 'Qwertyuiop1!'
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.haveOwnProperty('status');
        expect(res.body).to.haveOwnProperty('status').that.is.a('string');
        expect(res.body).to.haveOwnProperty('data').that.is.an('object');
        expect((res.body)).to.have.all.keys('status', 'data');
        expect((res.body)).to.haveOwnProperty('status').that.equals('success');
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

describe('TESTING PROPERTY ENDPOINTS', () => {
  it('should save property advert details provided by user', (done) => {
    chai.request(server)
      .post('/api/v1/property')
      .set('Authorization', `Bearer ${testToken}`)
      .field('price', 3500000)
      .field('state', 'Lagos')
      .field('city', 'Ikeja')
      .field('address', 'Odalume, Ladipo, Lagos State')
      .field('type', '2-bedroom')
      .attach('image', path.join(`${__dirname}/images/colourful.jpg`))
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body).to.have.keys('status', 'data');
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').that.equals('success');
        expect(res.body).to.have.ownProperty('data').to.be.an('object');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.status).to.be.a('string');
        expect(res.body.data.state).to.be.a('string');
        expect(res.body.data.type).to.be.a('string');
        expect(res.body.data.city).to.be.a('string');
        expect(res.body.data.address).to.be.a('string');
        expect(res.body.data.image_url).to.be.a('string');
        expect(res.body.data.price).to.be.a('number');
        done();
      });
  });
  it('should update property advert details provided by user', (done) => {
    chai.request(server)
      .patch('/api/v1/property/3')
      .set('Authorization', `Bearer ${testToken}`)
      .field('price', 1000000)
      .field('state', 'Kwara')
      .field('city', 'Ilorin')
      .field('address', '39, Balogun Fulani Road, Ilorin')
      .field('type', '3-bedroom')
      .attach('image', path.join(`${__dirname}/images/colourful.jpg`))
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body).to.have.keys('status', 'data');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').that.equals('success');
        expect(res.body).to.have.ownProperty('data').to.be.an('object');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.status).to.be.a('string');
        expect(res.body.data.state).to.be.a('string');
        expect(res.body.data.type).to.be.a('string');
        expect(res.body.data.city).to.be.a('string');
        expect(res.body.data.address).to.be.a('string');
        expect(res.body.data.image_url).to.be.a('string');
        expect(res.body.data.price).to.be.a('number');
        done();
      });
  });
  it('should get all properties posted on the app', (done) => {
    chai.request(server)
      .get('/api/v1/property')
      .end((err, res) => {
        if (err)done(err);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').that.equals('success');
        expect(res.body).to.have.ownProperty('data').to.be.an('array');
        expect(res.body.data[0].id).to.be.a('number');
        expect(res.body.data[0].status).to.be.a('string');
        expect(res.body.data[0].state).to.be.a('string');
        expect(res.body.data[0].type).to.be.a('string');
        expect(res.body.data[0].city).to.be.a('string');
        expect(res.body.data[0].address).to.be.a('string');
        expect(res.body.data[0].image_url).to.be.a('string');
        expect(res.body.data[0].price).to.be.a('number');
        expect(res.body.data[0].ownerEmail).to.be.a('string');
        expect(res.body.data[0].ownerPhoneNumber).to.be.a('string');
        done();
      });
  });
  it('should get all properties of a SPECIFIC PROPERTY TYPE posted on the app', (done) => {
    chai.request(server)
      .get('/api/v1/property?type=3-bedroom')
      .end((err, res) => {
        if (err)done(err);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').that.equals('success');
        expect(res.body).to.have.ownProperty('data').to.be.an('array');
        expect(res.body.data[0].id).to.be.a('number');
        expect(res.body.data[0].status).to.be.a('string');
        expect(res.body.data[0].state).to.be.a('string');
        expect(res.body.data[0].type).to.be.a('string');
        expect(res.body.data[0].city).to.be.a('string');
        expect(res.body.data[0].address).to.be.a('string');
        expect(res.body.data[0].image_url).to.be.a('string');
        expect(res.body.data[0].price).to.be.a('number');
        expect(res.body.data[0].ownerEmail).to.be.a('string');
        expect(res.body.data[0].ownerPhoneNumber).to.be.a('string');
        done();
      });
  });
  it('should return an error when an invalid or a non-existent property type is entered', (done) => {
    chai.request(server)
      .get('/api/v1/property?type=3-Bedroom')
      .end((err, res) => {
        if (err)done(err);
        expect(res.body).to.have.keys('status', 'error');
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').that.equals('error');
        expect(res.body).to.have.ownProperty('error').to.be.a('string');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('No result found. Enter a valid value and try again.');
        done();
      });
  });
  it('should update property advert as Sold', (done) => {
    chai.request(server)
      .patch('/api/v1/property/3/sold')
      .set('Authorization', `Bearer ${testToken}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').that.equals('success');
        expect(res.body).to.have.ownProperty('data').to.be.an('object');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.status).to.be.a('string');
        expect(res.body.data.state).to.be.a('string');
        expect(res.body.data.type).to.be.a('string');
        expect(res.body.data.city).to.be.a('string');
        expect(res.body.data.address).to.be.a('string');
        expect(res.body.data.image_url).to.be.a('string');
        expect(res.body.data.price).to.be.a('number');
        done();
      });
  });
  it('should delete a property advert', (done) => {
    chai.request(server)
      .delete('/api/v1/property/3')
      .set('Authorization', `Bearer ${testToken}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status', 'data');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').that.equals('success');
        expect(res.body).to.have.ownProperty('data').to.be.an('object');
        expect(res.body.status).to.be.a('string');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.message).to.be.an('string');
        done();
      });
  });
  it('should return message "Advert not found. Advert may have been removed" if property ID does not exist', (done) => {
    chai.request(server)
      .delete('/api/v1/property/30')
      .set('Authorization', `Bearer ${testToken}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.keys('status', 'error');
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('status').that.equals('error');
        expect(res.body).to.have.ownProperty('error').to.be.a('string');
        expect(res.body.status).to.be.a('string');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal('Advert not found. Advert may have been removed');
        done();
      });
  });
});
