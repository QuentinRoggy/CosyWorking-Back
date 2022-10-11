const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');


module.exports = {
  async addImage(workspaceId, imageList) {
    
    const queryImage = [];
    const values = [];
    let counter = 2;

    for(const key of imageList){
      queryImage.push(`($1, $${counter}, false)`);
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

};