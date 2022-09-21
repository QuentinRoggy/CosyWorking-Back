const debug = require('debug')('SQL:log');
const { Pool } = require('pg');
 
const pool = new Pool({process.env.DATABASE_URL});
 
module.exports = {
    originalClient: pool,
 
    async query(...params) {
        debug(...params);
 
        return this.originalClient.query(...params);
    },
};
