const client = require("../config/db");

module.exports = {

  async getWorkspaceByPk(workspaceId) {
  const queryString = `
  SELECT DISTINCT workspace.id, workspace.title, workspace.description, workspace.address, workspace.zip_code, workspace.city, workspace.latitude, 
  workspace.longitude, workspace.morning_price, workspace.afternoon_price, workspace.day_price, 
  (SELECT ARRAY_AGG(image.link) FROM image WHERE image.workspace_id = $1) as image_links,
  "user".first_name as host 
  FROM workspace
  JOIN "user" ON "user".id = workspace.user_id
  JOIN image ON image.workspace_id = workspace.id
  WHERE workspace.id = $1
  `;
  const result = await client.query(queryString, [workspaceId]);

  return result.rows;
  },

  async getWorkspacesByHostId(hostId) {
    const queryString = ``;

    const result = await client.query(queryString, [hostId]);

    return result.rows;
  },

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
    
    const queryString = `
    SELECT workspace.title, workspace.day_price, workspace.city, image.link as image_link
    FROM workspace
    JOIN image ON image.workspace_id = workspace.id
    WHERE image.main_image = true
    ORDER BY RANDOM() LIMIT 5;
    `;
    
    const result = await client.query(queryString);
    return result.rows;
  }

}