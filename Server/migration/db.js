import '@babel/polyfill';
import 'dotenv/config';

const { Pool } = require('pg');


let dbString = null;
if (process.env.NODE_ENV === 'production') dbString = process.env.DATABASE_URL;
if (process.env.NODE_ENV === 'test') dbString = process.env.DATABASE_TEST;
if (process.env.NODE_ENV === 'development') dbString = process.env.DATABASE_DEV_URL;
const pool = new Pool({
  connectionString: dbString
});

const dropTables = async () => {
  const userTables = `DROP TABLE IF EXISTS users CASCADE`;
  const propertyTable = `DROP TABLE IF EXISTS property CASCADE`;
  const flagTable = `DROP TABLE IF EXISTS flags CASCADE`;
  try {
    await pool.query(userTables);
    await pool.query(propertyTable);
    await pool.query(flagTable);
    await console.log('Dropped tables SUCCESSFULLY');
  } catch (err) {
    console.log(err, 'Dropped tables operation FAILED');
  }

};

const createTables = async () => {
  const users = `CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    address VARCHAR(30) NOT NULL,
    password VARCHAR(128) NOT NULL,
    phoneNumber VARCHAR(128) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE
  );`;

  const property = `CREATE TABLE property(
    id SERIAL PRIMARY KEY NOT NULL,
    owner INTEGER REFERENCES users(id) NOT NULL,
    status VARCHAR(45) DEFAULT 'available',
    price FLOAT NOT NULL,
    state VARCHAR(45) NOT NULL,
    city VARCHAR(128) NOT NULL,
    address text NOT NULL,
    type VARCHAR(128) NOT NULL,
    created_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    image_url text NOT NULL
  );`;
  const flags = `CREATE TABLE flags(
      id INTEGER PRIMARY KEY NOT NULL,
      property_id INTEGER REFERENCES property(id) NOT NULL,
      created_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      reason VARCHAR(128) NOT NULL,
      description TEXT NOT NULL
      );`;
  try {
    await pool.query(users);
    await pool.query(property);
    await pool.query(flags);
    await console.log('Tables created SUCCESSFULLY');
  } catch (err) {
    console.log(err, 'Tables creation failed');
  }
};

const callTables = async () => {
  await dropTables();
  await createTables();
  await console.log('database functions called successfully');
  await process.exit(0);
};

callTables();
