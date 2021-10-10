const expressJwt = require('express-jwt');
const {
    jwtSecret,
    jwtSignAlgorithm,
} = require('../../../config/config');
const {
    ForbiddenError,
} = require('../errors/errorsTypes');
const UserRepository = require('../../../infra/db/repositories/UserRepository');
const userRepository = new UserRepository();

module.exports = () => {
    return [
        expressJwt({ secret: jwtSecret, algorithms: [jwtSignAlgorithm] }),
        async (req, res, next) => {
            try {
                const email = req.user.sub;
                const user = await userRepository.getByEmail({ email });
                if (!user) {
                    throw new ForbiddenError('unauthorize');
                };
                req.user = user;
                next();
            } catch (error) {
                next(error);
            }
        }
    ]
};


