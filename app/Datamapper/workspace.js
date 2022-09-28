const client = require("../config/db");

module.exports = {
  async create(workspaceToInsert) {
    const queryString = `INSERT INTO "workspace" (title, description, address, zip_code, city, morning_price, afternoon_price, day_price, user_id, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
    
    const values = [];

    for (const key in workspaceToInsert) {
      values.push(workspaceToInsert[key]);
    };

    const result = await client.query(queryString, [...values]);
    
    return result.rows;
  },

  async getRandom(){
    
    const queryString = `SELECT * FROM "workspace" ORDER BY RANDOM LIMIT 5;`;
    const result = await client.query(queryString);
    return result.rows;
  }

}