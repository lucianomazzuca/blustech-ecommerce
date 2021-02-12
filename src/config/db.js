const { Sequelize } = require('sequelize');

module.exports = new Sequelize('blastech_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});


