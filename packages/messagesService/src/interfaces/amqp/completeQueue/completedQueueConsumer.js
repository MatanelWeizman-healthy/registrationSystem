const logger = require('../../../infra/logger');
const MessageRepository = require('../../../infra/db/repositories/messageRepository');
const messageRepository = new MessageRepository();
const { COMPLETED_STATUS } = require('../../../config/constants');


const completedQueueConsumer = async (message, metadata) => {
    try {
        if (message.status !== COMPLETED_STATUS) {
            throw new Error(`not suitable message ${message}`);
        };
        const storedMessage = await messageRepository.getByEmail({ email: message.email });
        await messageRepository.updateByEmail({ entity: storedMessage, payloadForUpdate: message });
        logger.info(`${message.email} complete the process`, { message });
    } catch (error) {
        throw (error);
    };
};

module.exports = completedQueueConsumer;