const MessageRepository = require('../../../infra/db/repositories/messageRepository');
const messageRepository = new MessageRepository();
const amqpManager = require('../AMQPManager');
const {
    MESSAGES_EXCHANGE,
    IN_PROCESS_STATUS,
    IN_PROCESS_MESSAGES_QUEUE,
    CREATED_STATUS,
} = require('../../../config/constants');


const createdQueueConsumer = async (message, metadata) => {
    try {
        if (message.status !== CREATED_STATUS) {
            throw new Error(`not suitable message ${message}`);
        };
        message.status = IN_PROCESS_STATUS;
        await messageRepository.create({ entityDetails: message });

        await amqpManager.publish({
            exchangeName: MESSAGES_EXCHANGE,
            routingKey: IN_PROCESS_MESSAGES_QUEUE,
            payload: message,
        });
    } catch (error) {
        throw (error);
    };
};

module.exports = createdQueueConsumer;