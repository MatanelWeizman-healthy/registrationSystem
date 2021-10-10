const {
    serviceName,
    devMode,
} = require('../config/config');
const Logger = require('@ownhealthil/logger');


const prettyConsoleTransport = {
    transports: {
        prettyConsole: true,
    }
}
const prettyConsoleTransportWhenDevMode = devMode ? prettyConsoleTransport : {}

const logger = new Logger({
    serviceName,
    sendEventOnError:false,
    ...prettyConsoleTransportWhenDevMode,
});

module.exports = logger;