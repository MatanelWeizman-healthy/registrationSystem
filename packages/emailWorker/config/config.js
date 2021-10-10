module.exports = {
    serviceName: 'emailWorker',
    mailSourceAddress: process.env.SENDGRID_VERIFIED_SENDER,
    mailApiKey: process.env.SENDGRID_API_KEY,
    defaultMessage: {
        subject: 'Congratulations on joining',
        text: ':)'
    },
    devMode: process.env.NODE_ENV === 'development' ? true : false,
    amqpConnectionString: Boolean(process.env.RUN_FROM_DOCKER) ? process.env.AMQP_CONNECTION_STRING_FROM_DOCKER : process.env.AMQP_CONNECTION_STRING,
}

