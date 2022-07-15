const sequelize = require('../../database');
const Sequelize = require('Sequelize')

const taskModel = sequelize.define('task', {
    id:
    { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    task:
    { type: Sequelize.STRING, allowNull: false },
    deadline:
    { type: Sequelize.DATE, allowNull: false },
    status:
    { type: Sequelize.STRING, allowNull: false }
  });

module.exports = taskModel;