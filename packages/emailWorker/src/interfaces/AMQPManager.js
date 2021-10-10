const { AMQPManager } = require('@ownhealthil/messenger');
const { amqpConnectionString } = require('../../config/config')


const options = {
    connectionString: amqpConnectionString,
};
messenger = new AMQPManager(options);

module.exports = messenger;