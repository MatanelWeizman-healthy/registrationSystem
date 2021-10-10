const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pick = require('lodash.pick');
const amqpManager = require('../../amqp/AMQPManager');

const {
    jwtSecret,
    jwtSignAlgorithm,
    jwtExpire,
    publicUserModelField,
} = require('../../../config/config');
const UserRepository = require("../../../infra/db/repositories/UserRepository");
const userRepository = new UserRepository();
const {
    ValidationError,
    UnauthorizedError,
    ResourceNotFoundError
} = require('../errors/errorsTypes');
const { userSchema } = require('./userValidation');
const {
    MESSAGES_EXCHANGE,
    CREATED_MESSAGES_QUEUE,
    CREATED_STATUS,
} = require('../../../config/constants');

const userController = {
    authenticate: async (req, res) => {
        try {
            if (!jwtSecret) {
                throw new Error('cannot running without SECRET');
            }
            const { email, password } = req.body;
            if (!email || !password) {
                throw new ValidationError('must to pass email and password');
            }
            const user = await userRepository.getByEmail({ email, withPassword: true });
            if (!user) throw new ResourceNotFoundError('User not found');
            const suitablePassword = await bcrypt.compare(password, user.hashedPassword);
            if (!suitablePassword) {
                throw new UnauthorizedError('authentication failed');
            }
            const token = jwt.sign(
                { sub: email },
                jwtSecret,
                { expiresIn: jwtExpire, algorithm: jwtSignAlgorithm }
            );
            return token;

        } catch (error) {
            throw error;
        }
    },

    getAll: async (req, res) => {
        try {
            const allUsers = await userRepository.getAll();
            return allUsers;
        } catch (error) {
            throw error;
        }
    },

    getByEmail: async (req, res) => {
        try {
            const email = req.params.email;
            if (!email) throw new ValidationError('must to pass email');
            const user = await userRepository.getByEmail({ email })
            return user;
        } catch (error) {
            throw error;
        }
    },

    deleteByEmail: async (req, res) => {
        try {
            const email = req.params.email;
            if (!email) throw new ValidationError('must to pass email');
            await userRepository.deleteByEmail({ email });
        } catch (error) {
            throw error;
        }
    },


    updateByEmail: async (req, res) => {
        try {
            const email = req.params.email;

            if (!email) throw new ValidationError('must to pass email as param');
            const user = await userRepository.getByEmail({ email });
            if (!user) throw new ResourceNotFoundError('User not found');
            const payloadForUpdate = req.body;
            let pureUser = pick(user, publicUserModelField);
            const updatedUser = { ...pureUser, ...payloadForUpdate };
            const result = userSchema.validate(updatedUser);
            if (result.error) {
                throw new ValidationError(result.error.message);
            };
            const uniqueValueChangeAndAlreadyExist = await userRepository.uniqueValueChangeAndAlreadyExist({ origin: user, updated: updatedUser });

            if (uniqueValueChangeAndAlreadyExist) {
                throw new ValidationError('unique value change and already exist');
            }

            await userRepository.updateByEmail({ user, payloadForUpdate });
        } catch (error) {
            throw error;
        }
    },

    register: async (req, res) => {
        try {
            let userDetails = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
            }
            userDetails.hashedPassword = await bcrypt.hash(userDetails.password, 10);
            delete userDetails.password;
            const newUser = await userRepository.create({ userDetails });
            await amqpManager.publish({
                exchangeName: MESSAGES_EXCHANGE,
                routingKey: CREATED_MESSAGES_QUEUE,
                payload: {
                    email: newUser.email,
                    status: CREATED_STATUS,
                    content: `${newUser.firstName}, congratulations on your registration for the service :)`,
                },
            });
            return { message: `create new user ${newUser.email}` };
        } catch (error) {
            throw error;
        };
    },
};

module.exports = userController;