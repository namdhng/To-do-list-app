const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    database: 'postgres',
    username: 'postgres',
    host: "localhost",
    dialect: 'postgres'
  });

module.exports = sequelize;
