const completedQueueConsumer = require('./completedQueueConsumer');
const {
  COMPLETED_MESSAGES_QUEUE,
} = require('../../../config/constants');

module.exports = () => {
  try {
    const queueProcessingOptions = {
      queueName: COMPLETED_MESSAGES_QUEUE,
      consumer: completedQueueConsumer,
    };
    messenger.consume(queueProcessingOptions);
  } catch (error) {
    throw (error);
  }
};