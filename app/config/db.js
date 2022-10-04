// require("dotenv").config();
const debug = require('debug')('SQL:log');
const { Pool } = require('pg');
const config = require('../../config');
 
const pool = new Pool(config.DATABASE_URL);


 
module.exports = {
    originalClient: pool,
    
    async query(...params) {
        debug(...params);
        return this.originalClient.query(...params);
    },
};
