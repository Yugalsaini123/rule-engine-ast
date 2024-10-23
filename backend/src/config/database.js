// backend/src/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rule_engine_db', 'postgres', 'Yugal@123', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;