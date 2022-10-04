const http = require('http');
// require('dotenv').config();
const config = require('./config');
let mode = '';

const debug = require('debug')('app:server');
const app = require('./app');

debug(`NODE_ENV=${config.NODE_ENV}`);

const port = process.env.PORT ?? 3000;

const server = http.createServer(app);

server.listen(config.PORT, config.HOST, () => {
    debug(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
});