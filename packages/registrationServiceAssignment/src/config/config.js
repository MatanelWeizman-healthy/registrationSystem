module.exports = {
    port: process.env.PORT || 3000,
    serviceName: 'registrationService',
    dbConnectionString: Boolean(process.env.RUN_FROM_DOCKER) ? process.env.POSTGRES_FROM_DOCKER : process.env.POSTGRES,
    devMode: process.env.NODE_ENV === 'development' ? true : false,
    jwtSecret: process.env.SECRET,
    jwtSignAlgorithm: 'HS256',
    jwtExpire: '1d',
    uniqueFields: ['email', 'phone'],
    publicUserModelField: [
        'firstName',
        'lastName',
        'email',
        'phone',
    ],
    amqpConnectionString: Boolean(process.env.RUN_FROM_DOCKER) ? process.env.AMQP_CONNECTION_STRING_FROM_DOCKER : process.env.AMQP_CONNECTION_STRING,
};