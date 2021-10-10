const Server = require('./interfaces/http/Server');
const db = require('./infra/db/db');
const amqpManager = require('./interfaces/amqp/AMQPManager');

module.exports = class App {
    constructor() {
        this.server = new Server();
        this.db = db;
        this.amqpManager =amqpManager;
    }
    async start() {
        try {
            await this.db.initialize();
            await this.amqpManager.environmentInitialization()
            const app = await this.server.start();
            return app;
        } catch (error) {
            throw (error);
        }
    }
}
