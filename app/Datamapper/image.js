const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');


module.exports = {
  async addImage(workspaceId, mainImage, otherImagesLink) {
    
    const queryImage = [];
    const values = [];
    let counter = 2;

    if (otherImagesLink[0].length > 0) {
      for (const link of otherImagesLink) {
        queryImage.push(`($1, $${counter}, false)`);
        values.push(link);
        counter++;
      }
    }

    queryImage.push(`($1, $${counter}, true)`)
    values.push(mainImage);

    let queryString = `
     INSERT INTO image (workspace_id, link, main_image) 
    VALUES ${queryImage.join(',')};
    `;

    const result = await client.query(queryString, [workspaceId, ...values]);

    return result.rows;
  },

  async deleteWorkspaceImages(workspaceId, searchDetails){

    const imageId = searchDetails.image_id;

    let queryString = "DELETE FROM image WHERE image.workspace_id = $1 AND image.id = $2 RETURNING *";

    await client.query(queryString, [workspaceId, imageId]);

    const result = await client.query(`SELECT id as image_id, link, main_image, workspace_id FROM image WHERE workspace_id = $1`, [workspaceId]);

    return result.rows
  },

    async updateImage(workspaceId, body) {
    let path = '';
    let isMainImage = false;

    
    if (body?.workspace_mainImage){
      await client.query(`DELETE FROM image WHERE workspace_id = $1 AND main_image = true`, [workspaceId]);
      path = body.workspace_mainImage;
      isMainImage = true

    } else if (body?.workspace_image) {
      path = body.workspace_image;
      isMainImage = false;
    }

    await client.query(`INSERT INTO image (workspace_id, main_image, link) VALUES ($1, $2, $3)`, [workspaceId, isMainImage, path])

    const result = await client.query(`SELECT id as image_id, link, main_image, workspace_id FROM image WHERE workspace_id = $1`, [workspaceId]);

    return result.rows;

  },
};