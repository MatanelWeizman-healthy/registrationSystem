const express = require('express');
const cors = require('cors');
const httpLogger = require('../../infra/httpLogger');
const logger = require('../../infra/logger');
const router = require('./router');
const { port } = require('../../config/config');
const errorHandler = require('./errors/errorHandler');

module.exports = class Server {
    constructor() {
        this.app = express();
        this.httpLogger = httpLogger;
        this.port = port;
    }

    async start() {
        try {
            this.app
                .use(cors())
                .use(this.httpLogger)
                .use(express.json())
                .use(express.urlencoded({ extended: false }))
                .use(router)
                .use(errorHandler);
            return this.app.listen(port, () => logger.info(`listen in ${this.port}`));
        } catch (error) {
            throw (error);
        }
    }
}
