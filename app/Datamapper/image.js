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
};