const logger = require('../../logger');
const {
    models: { Message },
} = require('../db');


module.exports = class MessageRepository {
    constructor() {
        this.model = Message;
    }

    async getAll() {
        try {
            const all = await this.model.findAll();
            return all;
        } catch (error) {
            throw (error);
        }
    }

    async getByEmail({ email } = {}) {
        try {
            if (!email) throw new Error('must to pass email');
            const query = { where: { email } };
            const entity = await this.model.findOne(query);
            if (!entity) throw new Error(`${email} not found`);
            return entity;
        } catch (error) {
            throw (error);
        };
    }

    async updateByEmail({ entity, payloadForUpdate }) {
        try {
            if (!entity || !payloadForUpdate) throw new Error('must to pass entity and payloadForUpdate');
            const entityForUpdate = Object.assign(entity, payloadForUpdate);
            await entityForUpdate.save();
            logger.info(`${entity.email} successfully updated`, { ...entityForUpdate.dataValues });
        } catch (error) {
            logger.error('failed to update', { entity });
            throw (error);
        }
    }

    async existenceChecking({ criteria }) {
        try {
            const entity = await this.model.findOne({ where: criteria });
            const exist = entity ? true : false;
            return exist;
        } catch (error) {
            throw (error);
        }
    }


    async create({ entityDetails }) {
        try {
            const emailAlreadyExist = await this.existenceChecking({
                criteria: { email: entityDetails.email },
            });
            if (emailAlreadyExist) {
                throw new Error(`the email ${entityDetails.email} is already taken`);
            }
            const newEntity = await this.model.create(entityDetails);
            logger.info(`${entityDetails.email} message successfully saved`, { entityDetails })
            return newEntity;
        } catch (error) {
            throw error;
        }
    }
}

