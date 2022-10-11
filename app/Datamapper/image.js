const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');


module.exports = {
  async addImage(workspaceId, imageList) {
    
    const queryImage = [];
    const values = [];
    let counter = 2;

    for(const key of imageList){
      if (key.fieldname.includes("mainImage")) {
        queryImage.push(`($1, $${counter}, true)`);
      } else {
        queryImage.push(`($1, $${counter}, false)`);
      }
      values.push(key.path);
      counter++;
    }

    const queryString = `
    INSERT INTO image (workspace_id, link, main_image) 
    VALUES ${queryImage.join(',')};
    `;

    const result = await client.query(queryString, [workspaceId, ...values]);

    return result.rows;
  },

  async deleteWorkspaceImages(workspaceId, searchDetails){

    const imageId = searchDetails.id

    let queryString = "DELETE FROM image WHERE image.workspace_id = $1 AND image.id = $2 RETURNING *";

    const result = await client.query(queryString, [workspaceId, imageId]);

    return result.rows
  }

    async updateMainImage(workspaceId, imageList) {

    await client.query(`DELETE FROM image WHERE workspace_id = $1 AND main_image = true`, [workspaceId]);

    await client.query(`INSERT INTO image (workspace_id, main_image, link) VALUES ($1, $2, $3)`, [workspaceId, true, imageList[0].path])

    const result = await client.query(`SELECT * FROM image WHERE workspace_id = $1`, [workspaceId]);

    console.log(result);

    return result.rows;

  },

  async updateImages(workspaceId, imageList) {

    await client.query(`INSERT INTO image (workspace_id, main_image, link) VALUES ($1, $2, $3)`, [workspaceId, false, imageList[0].path]);
    const result = await client.query(`SELECT * FROM image WHERE workspace_id = $1`, [workspaceId]);

    return result.rows;
  }
};