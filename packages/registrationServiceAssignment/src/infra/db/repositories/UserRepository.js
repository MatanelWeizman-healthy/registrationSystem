const logger = require('../../logger');
const {
    ResourceNotFoundError,
    ValidationError,
} = require('../../../interfaces/http/errors/errorsTypes');

const {
    models: { User },
} = require('../db');
const { uniqueFields } = require('../../../config/config');


module.exports = class UserRepository {
    constructor() {
        this.model = User;
    }

    async getAll() {
        try {
            const allUsers = await this.model.findAll();
            return allUsers;
        } catch (error) {
            throw (error);
        }
    }

    async getByEmail({ email, withPassword = false } = {}) {
        try {
            if (!email) throw new ValidationError('must to pass email');
            const query = { where: { email } };
            let user;
            if (withPassword) {
                user = await this.model.scope('withPassword').findOne(query);
            } else {
                user = await this.model.findOne(query);
            }
            if (!user) throw new ResourceNotFoundError('User not found');
            return user;
        } catch (error) {
            throw (error);
        }
    }

    async deleteByEmail({ email }) {
        let user;
        try {
            if (!email) throw new ValidationError('must to pass email');
            user = await this.model.findOne({ where: { email } })
            if (!user) throw new ResourceNotFoundError('User not found');
            await this.model.destroy({ where: { email } });
            logger.info('delete user', { user });
        } catch (error) {
            logger.error('failed to delete user', { user });
            throw (error);
        }
    }

    async updateByEmail({ user, payloadForUpdate }) {
        try {
            if (!user || !payloadForUpdate) throw new ValidationError('must to pass user and payloadForUpdate');
            const userForUpdate = Object.assign(user, payloadForUpdate);
            await userForUpdate.save();
            logger.info(`${user.email} successfully updated`, { ...userForUpdate.dataValues });
        } catch (error) {
            logger.error('failed to update user', { user });
            throw (error);
        }
    }

    async existenceChecking({ criteria }) {
        try {
            const user = await this.model.findOne({ where: criteria });
            const exist = user ? true : false;
            return exist;
        } catch (error) {
            throw (error);
        }
    }


    async uniqueValueChangeAndAlreadyExist({ origin, updated }) {
        try {
            let exist = false;
            for (const uniqueField of uniqueFields) {
                if (origin[uniqueField] !== updated[uniqueField]) {
                    if (!origin[uniqueField] && !updated[uniqueField]) {
                        continue;
                    }
                    let criteria = { [uniqueField]: uniqueField };
                    exist = await this.existenceChecking({ criteria });
                    break;
                } else {
                    continue;
                }
            }
            return exist;
        } catch (error) {
            throw error;
        }
    }

    async create({ userDetails }) {
        try {
            //TBD - united to method that get params and check in single request
            const userEmailAlreadyExist = await this.existenceChecking({
                criteria: { email: userDetails.email },
            });
            if (userEmailAlreadyExist) {
                throw new ValidationError(`the email ${userDetails.email} is already taken`);
            }

            const userPhoneAlreadyExist = await this.existenceChecking({
                criteria: { phone: userDetails.phone },
            });
            if (userPhoneAlreadyExist) {
                throw new ValidationError(`the phone ${userDetails.phone} is already taken`);
            }
            const newUser = await this.model.create(userDetails);
            logger.info(`user registered successfully`, { userDetails })
            return newUser;
        } catch (error) {
            throw error;
        }
    }
}

