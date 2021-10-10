const db = require('./infra/db/db');
const amqpManager = require('./interfaces/amqp/AMQPManager');
const logger = require('./infra/logger');
const { serviceName } = require('./config/config');
const createdQueueHandler = require('./interfaces/amqp/createdQueue/createdQueueHandler');
const completedQueueHandler = require('./interfaces/amqp/completeQueue/completedQueueHandler');


module.exports = class App {
    constructor() {
        this.db = db;
        this.amqpManager = amqpManager;
    }
    async start() {
        try {
            await this.db.initialize();
            await this.amqpManager.connect();
            logger.info(`${serviceName} initialized successfully`);
            
            createdQueueHandler();
            completedQueueHandler();
            
        } catch (error) {
            throw (error);
        }
    }
}
