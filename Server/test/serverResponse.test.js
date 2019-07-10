import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import debug from 'debug';
import server from '../app';

const logger = debug(`pro-lite-test`);
const { expect } = chai;
chai.use(chaiHttp);
