const path = require('path')
const { DB } = require('@ownhealthil/db');
const { dbConnectionString } = require('../../config/config');

const options = {
  connectionString: dbConnectionString, // Postgres connection string. Default - `process.env.DATABASE_URL/POSTGRES/DATABASE_URL`
  modelsPath: path.resolve('src/infra/db/models'), // Absolute path to the models directory
};

const db = new DB(options);

db.initialize = async()=>{
  await db.sequelize.sync();
}

module.exports = db;