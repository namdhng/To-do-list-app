const sequelize = require('../database');
const Sequelize = require('Sequelize')

const userModel = sequelize.define('user', {
    id: 
    { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    name:
    { type: Sequelize.STRING, allowNull: false },
    email:
    { type: Sequelize.STRING, allowNull: false },
    password:
    { type: Sequelize.STRING, allowNull: false }
  });

module.exports = userModel;