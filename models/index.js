const Sequelize = require("sequelize");
const config = require('config');
const dbConfig = config.get('db');
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig.info);

// pass your sequelize config here

// const UserModel = require("./user.model");

const models = {
    User: sequelize["import"]('./user')
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize
};

module.exports = db;