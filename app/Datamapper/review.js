const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');


module.exports = {
  async add(review) {


    const values = [];
    let counter = 1;
    const queryParams = [];
    const columns = [];
    
    for ( const key in review){
        columns.push(key);
        queryParams.push(`$${counter}`);
        counter ++;

        values.push(review[key])
    }
    
    const queryString = `
    INSERT INTO workspace_review (${columns.join(',')}) 
    VALUES (${queryParams.join(',')} ) RETURNING *`;

    const result = await client.query(queryString, [...values]); 
    return result.rows;

  },

  
};