const Sequelize = require('sequelize');
const client = require('./connection');

const sequelize = new Sequelize({
    database: 'postgres',
    username: 'postgres',
    host: "localhost",
    password: client.password,
    dialect: 'postgres'
  });

module.exports = sequelize;
