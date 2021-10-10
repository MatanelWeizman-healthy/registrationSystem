const { AMQPManager } = require('@ownhealthil/messenger');
const logger = require('../../infra/logger');
const { amqpConnectionString } = require('../../config/config')
const {
    CREATED_MESSAGES_QUEUE,
    IN_PROCESS_MESSAGES_QUEUE,
    COMPLETED_MESSAGES_QUEUE,
    MESSAGES_EXCHANGE,
} = require('../../config/constants');


const options = {
    connectionString: amqpConnectionString,
};
messenger = new AMQPManager(options);


const environmentInitialization = async () => {
    try {

        await messenger.connect();

        await messenger.createQueue({ queueName: CREATED_MESSAGES_QUEUE });
        await messenger.createQueue({ queueName: IN_PROCESS_MESSAGES_QUEUE });
        await messenger.createQueue({ queueName: COMPLETED_MESSAGES_QUEUE });

        const createExchangeOptions = {
            exchangeName: MESSAGES_EXCHANGE,
            exchangeType: 'topic',
        };

        await messenger.createExchange(createExchangeOptions);

        const bindCreatedMessagesQueueOptions = {
            exchangeName: MESSAGES_EXCHANGE,
            queueName: CREATED_MESSAGES_QUEUE,
            routingPattern: 'messages.created'
        };

        const bindInProcessMessagesQueueOptions = {
            exchangeName: MESSAGES_EXCHANGE,
            queueName: IN_PROCESS_MESSAGES_QUEUE,
            routingPattern: 'messages.inProcess'
        };

        const bindCompletedMessagesQueueOptions = {
            exchangeName: MESSAGES_EXCHANGE,
            queueName: COMPLETED_MESSAGES_QUEUE,
            routingPattern: 'messages.completed'
        };

        await messenger.bindQueue(bindCreatedMessagesQueueOptions);
        await messenger.bindQueue(bindInProcessMessagesQueueOptions);
        await messenger.bindQueue(bindCompletedMessagesQueueOptions);

        logger.info('successfully build the pubSub environment');
    } catch (error) {
        logger.error('failed to build the pubSub environment', { error });
        throw (error);
    }
}

messenger.environmentInitialization = environmentInitialization;

module.exports = messenger;