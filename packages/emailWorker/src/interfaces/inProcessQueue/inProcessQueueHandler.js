const inProcessQueueConsumer = require('./inProcessQueueConsumer');
const {
  IN_PROCESS_MESSAGES_QUEUE,
} = require('../../../config/constants');

module.exports = () => {
  try {
    const queueProcessingOptions = {
      queueName: IN_PROCESS_MESSAGES_QUEUE,
      consumer: inProcessQueueConsumer,
    };
    messenger.consume(queueProcessingOptions);
  } catch (error) {
    throw (error);
  }
}