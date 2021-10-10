const amqpManager = require('./interfaces/AMQPManager');
const logger = require('./infra/logger');
const { serviceName } = require('../config/config');
const inProcessQueueHandler = require('./interfaces/inProcessQueue/inProcessQueueHandler');

module.exports = class App {
    constructor() {
        this.amqpManager = amqpManager;
    }
    async start() {
        try {
            await this.amqpManager.connect();
            logger.info(`${serviceName} initialized successfully`);
            inProcessQueueHandler();
        } catch (error) {
            throw (error);
        }
    }
};
