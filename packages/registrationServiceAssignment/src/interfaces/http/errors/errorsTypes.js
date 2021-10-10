const { devMode } = require('../../../config/config');

class ApplicationError extends Error {
    constructor(message, code = 500) {
        super(message);
        this.message = message;
        this.code = code;
        Error.captureStackTrace(this, ValidationError);
        this.name = this.constructor.name;
    }

    get statusCode() {
        return devMode ? this.code : undefined;
    }
    get displayMessage() {
        return devMode ? this.message : undefined;
    }
};

class ValidationError extends ApplicationError {
    constructor(message) {
        super(message, 400)
    }
};

class UnauthorizedError extends ApplicationError {
    constructor(message) {
        super(message, 401);
    }
};

class ForbiddenError extends ApplicationError {
    constructor(message) {
        super(message, 403);
    }
};

class ResourceNotFoundError extends ApplicationError {
    constructor(message) {
        super(message, 404);
    }
};

module.exports = {
    ApplicationError,
    ValidationError,
    UnauthorizedError,
    ResourceNotFoundError,
    ForbiddenError,
};
