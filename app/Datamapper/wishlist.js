const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');


module.exports = {
  async create(userId, workspaceId) {
    const queryString = `INSERT INTO wishlist (user_id, workspace_id) VALUES ($1, $2) RETURNING *;
    `
    const result = await client.query(queryString, [userId, workspaceId]);

    return result.rows;
  },

  async getOne(userId) {

    const queryString = `SELECT workspace.id, workspace.title, workspace.description, workspace.day_price,image.link, workspace.city
    FROM wishlist
    JOIN workspace on workspace.id = wishlist.workspace_id
    JOIN image on image.workspace_id = workspace.id
    WHERE wishlist.user_id = $1 AND image.main_image = true`;

    const result = await client.query(queryString, [userId]);

    return result.rows;
  },

  async deleteOne(workspaceId, userId) {
    const queryString = `DELETE FROM wishlist WHERE workspace_id = $1 AND user_id = $2`;
    const result = await client.query(queryString, [workspaceId, userId]);
    return result.rows;
  }

  
};