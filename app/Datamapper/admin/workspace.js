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
  },

  async patch(workspaceId, data) {
    let columns = [];
    let counter = 2;
    let queryParams = [];
    let values = [];

    for (const key in data) {
      columns.push(key);
      queryParams.push(`$${counter}`);
      counter ++;
      values.push(data[key]);
    }

    if (queryParams.length > 1 ) {
      queryString = `UPDATE workspace SET ( ${columns.join(',')} ) = (${queryParams.join(',')}) WHERE id = $1 RETURNING *;`;

    } else {
      queryString = `UPDATE workspace SET ${columns.join(',')} = ${queryParams.join(',')} WHERE id = $1 RETURNING *;`;
    }

    const result = await client.query(queryString, [workspaceId, ...values]);

    return result.rows;
  },

  async delete(workspaceId) {
    await client.query(`DELETE FROM workspace WHERE id = $1;`, [workspaceId]);
    return;
  }
}