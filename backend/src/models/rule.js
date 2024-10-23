// backend/src/models/rule.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rule = sequelize.define('Rule', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  ast: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
});

module.exports = Rule;