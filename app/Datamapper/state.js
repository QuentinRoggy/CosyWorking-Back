const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');

module.exports = {

    async getFromStateDescription() {

        const queryString = `SELECT id FROM state WHERE description = 'En attente'`;
        const result = await client.query(queryString); 
        return result.rows[0].id;

    }

}


        //select where id is "attente"
        // get this id put in req body
        
        // put req body into table resa