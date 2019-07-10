import { Pool } from 'pg';
import 'dotenv/config';
import debug from 'debug';


const logger = debug('model');
export default class Model {
  constructor(table) {
    const dbString = (process.env.NODE_ENV === 'production') ? process.env.DATABASE_URL
      : (process.env.NODE_ENV === 'test') ? process.env.DATABASE_TEST
        : process.env.DATABASE_DEV_URL;
    this.table = table;
    this.pool = new Pool({
      connectionString: dbString
    });
    this.pool.connect()
      .then(() => {
        logger(`connected to the db - ${process.env.NODE_ENV} database --- Model`);
      })
      .catch(err => logger(err));
  }

  async select(columns, condition = '') {
    const query = `SELECT ${columns} FROM ${this.table} ${condition};`;
    const { rows } = await this.pool.query(query);
    return rows;
  }

  async insert(columns, values) {
    const query = `INSERT INTO ${this.table} (${columns}) VALUES (${values}) RETURNING *;`;
    const { rows: userResult } = await this.pool.query(query);
    return userResult[0];
  }

  async update(values, condition) {
    const query = `UPDATE ${this.table} SET ${values} WHERE ${condition} RETURNING *;`;
    const { rows: userResult } = await this.pool.query(query);
    return userResult[0];
  }

  async delete(condition) {
    const query = `DELETE FROM ${this.table} WHERE ${condition} RETURNING *;`;
    const { rows: userResult } = await this.pool.query(query);
    return userResult[0];
  }

  async selectAndJoin(columns, alias1 = '', otherTable, alias2 = '', condition = '') {
    const query = `SELECT ${columns} FROM ${this.table} AS ${alias1}
    JOIN ${otherTable} AS ${alias2} ${condition};`;
    const { rows } = await this.pool.query(query);
    return rows;
  }
}
