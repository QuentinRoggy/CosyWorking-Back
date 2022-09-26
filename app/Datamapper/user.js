const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');

module.exports = {
  async findByEmail(emailToFind) {
    const queryString = 'SELECT email FROM "user" WHERE email = $1'
    const result = await client.query(queryString, [emailToFind]);

    return result.rows;
  },

  async findUserLoggedByEmail(emailToFind) {
    const queryString = 'SELECT "user".id, "user".email, "user".password, role.id AS role_id, role.description AS role_description  FROM "user" JOIN role ON "user".role_id = role.id WHERE "user".email = $1';
  
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


