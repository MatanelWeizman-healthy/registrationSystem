const createdQueueConsumer = require('./createdQueueConsumer');
const {
  CREATED_MESSAGES_QUEUE,
} = require('../../../config/constants');

module.exports = () => {
  try {
    const queueProcessingOptions = {
      queueName: CREATED_MESSAGES_QUEUE,
      consumer: createdQueueConsumer,
    };
    messenger.consume(queueProcessingOptions);
  } catch (error) {
    throw (error);
  }
}