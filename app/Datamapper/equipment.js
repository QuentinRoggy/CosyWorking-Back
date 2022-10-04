const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');


module.exports = {
  async getAll() {
    const result = await client.query(`SELECT equipment.id, equipment.description, equipment.icon_link FROM equipment`);

    return result.rows;
  }
};