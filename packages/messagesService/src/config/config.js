module.exports = {
    serviceName: 'messagesService',
    dbConnectionString: Boolean(process.env.RUN_FROM_DOCKER) ? process.env.POSTGRES_FROM_DOCKER : process.env.POSTGRES,
    devMode: process.env.NODE_ENV === 'development' ? true : false,
    amqpConnectionString: Boolean(process.env.RUN_FROM_DOCKER) ? process.env.AMQP_CONNECTION_STRING_FROM_DOCKER : process.env.AMQP_CONNECTION_STRING,

};