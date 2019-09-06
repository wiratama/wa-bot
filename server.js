
import http from 'http';
import chalk from 'chalk';
import config from './config';
import whatsAppBot from './app';

const currentEnv = process.env.NODE_ENV;
const port = config[currentEnv].app_port;

const normalizePort = (val) => {
    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

    switch (error.code) {
    case 'EACCES':
        console.error(chalk.bgRed(bind + ' requires elevated privileges'));
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(chalk.bgRed(bind + ' is already in use'));
        process.exit(1);
        break;
    default:
        throw error;
    }
}

const onListening = () => {
    let addr = appServer.address();
    let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    console.log(chalk.bgMagenta('Listening on ' + bind));
}

// create server
const appServer = http.createServer(whatsAppBot);
appServer.listen(normalizePort(config[currentEnv].app_port));
appServer.on('error', onError);
appServer.on('listening', onListening);
console.log(chalk.bgMagenta('Express started on port '+config[currentEnv].app_port));