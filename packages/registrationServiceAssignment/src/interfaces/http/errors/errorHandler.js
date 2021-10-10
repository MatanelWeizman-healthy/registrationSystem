const { genericErrorHandler } = require('@ownhealthil/middleware');
const logger = require('../../../infra/logger');

const errorHandler = genericErrorHandler({ logger });

module.exports = errorHandler;