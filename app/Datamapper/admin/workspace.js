const client = require('../../config/db');

module.exports = {
  async getAll() {
    const result = await client.query('SELECT * FROM workspace;');

    return result.rows;
  },

  async add(workspaceToAdd) {
    let columns = [];
    let counter = 1;
    let queryParams = [];
    let values = [];

    for (const key in workspaceToAdd) {
      columns.push(key);
      queryParams.push(`$${counter}`);
      counter ++;
      values.push(workspaceToAdd[key]);
    }

    const queryString = `INSERT INTO workspace (${columns.join(',')}) VALUES (${queryParams.join(',')}) RETURNING *;`;

    const result = await client.query(queryString, [...values]);

    return result.rows;
  }
}