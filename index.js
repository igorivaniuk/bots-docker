'use strict';

const express = require('express');
const morgan = require('morgan');
const http = require('http');
const config = require('./configs/config');

const port = '80';
const ip = '0.0.0.0';

// App
const app = express();

const format = ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] ' +
        '":referrer" ":user-agent" :response-time ms';

app.use(morgan(format));

app.get('/', function (req, res) {
    res.send('hello');
});

app.get('/env', function (req, res) {
  res.send(JSON.stringify(process.env, null, 2));
});

const server = http.createServer(app);

server.listen(port, ip);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // Handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}