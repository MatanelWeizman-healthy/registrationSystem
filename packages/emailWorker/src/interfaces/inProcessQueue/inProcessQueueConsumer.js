const amqpManager = require('../AMQPManager');
const mailSender = require('../../mailSender');
const {
    COMPLETED_STATUS,
    MESSAGES_EXCHANGE,
    COMPLETED_MESSAGES_QUEUE,
} = require('../../../config/constants');


const inProcessQueueConsumer = async (message, metadata) => {
    try {
        await mailSender({
            destination: message.email,
            text:message.content,
        });
        message.status = COMPLETED_STATUS;
        await amqpManager.publish({
            exchangeName: MESSAGES_EXCHANGE,
            routingKey: COMPLETED_MESSAGES_QUEUE,
            payload: message,
        });
    } catch (error) {
        throw (error);
    };
};

module.exports = inProcessQueueConsumer;