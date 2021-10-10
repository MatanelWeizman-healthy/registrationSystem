const sgMail = require('@sendgrid/mail');
const logger = require('./infra/logger');
const {
    mailSourceAddress,
    mailApiKey,
    defaultMessage,
} = require('../config/config');


sgMail.setApiKey(mailApiKey);
const mailSender = async ({ destination, subject = defaultMessage.subject, text = defaultMessage.text } = {}) => {
    try {
        const msg = {
            to: destination,
            from: mailSourceAddress,
            subject,
            text,
        };

        await sgMail.send(msg)
        logger.info('mail sent successfully', { email: msg })
    } catch (error) {
        throw (error);
    }

}

module.exports = mailSender;
