const App = require('./src/App');
const logger = require('./src/infra/logger');

const app = new App();

app.start()
    .catch((error) => {
        logger.error(error.message, { error });
        process.exit(1);
    })