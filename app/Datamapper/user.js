const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');

module.exports = {
  async findByEmail(emailToFind) {
    const queryString = 'SELECT email FROM "user" WHERE email = $1'
    const result = await client.query(queryString, [emailToFind]);

    return result.rows;
  },

  async create(userToInsert) {
    const queryString = `INSERT INTO "user" (last_name, first_name, email, password, gender, role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const values = [];

    for (const value in userToInsert) {
      values.push(userToInsert[value]);
    }

    const result = await client.query(queryString, [...values]);

    return result.rows;
  }
};


