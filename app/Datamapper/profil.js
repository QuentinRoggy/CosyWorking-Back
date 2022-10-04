const client = require('../config/db');
const { ApiError } = require('../errors/apiErrors');

module.exports = {

async getPersonalspaceByPk(userId) {

    const queryString = `
    SELECT "user".id, "user".last_name, "user".first_name, "user".email, "user".username, "user".avatar, "user".about, "user".gender, role.description AS role 
    FROM "user"
    JOIN role ON role.id = "user".role_id
    WHERE "user".id = $1
    `;
    
    const result = await client.query(queryString, [userId]);

    return result.rows;
}


}