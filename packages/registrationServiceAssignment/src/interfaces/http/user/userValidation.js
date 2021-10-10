const { inputValidation } = require('@ownhealthil/middleware');
const Joi = require('joi');
let extendJoi = Joi.extend(require('joi-phone-number'));
const logger = require('../../../infra/logger');

const inputValidator = inputValidation({ logger });

const userSchema = extendJoi.object({
    firstName: extendJoi.string().required(),
    lastName: extendJoi.string().required(),
    email: Joi.string().email().required(),
    phone: extendJoi.string().phoneNumber().required(),
    password: extendJoi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

module.exports = {
    userSchema,
    userInputValidator: inputValidator(userSchema),
};