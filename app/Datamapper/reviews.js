const client = require('../config/db');

module.exports = {

async getAllWorkspaceReviews(workspaceId) {

    const queryString = `SELECT * from "workspace_review" WHERE workspace_review.workspace_id = $1;`;
    
    const result = await client.query(queryString, [workspaceId]);

    return result.rows;
},




}

