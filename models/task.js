const sequelize = require('../database');
const Sequelize = require('Sequelize')

const taskModel = sequelize.define('task', {
    id:
    { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    task:
    { type: Sequelize.STRING, allowNull: false },
    deadline:
    { type: Sequelize.DATE, allowNull: false },
    check:
    { type: Sequelize.BOOLEAN, allowNull: false }
    // userId:
    // { type: Sequelize.INTEGER, allowNull: false }
  });

module.exports = taskModel;