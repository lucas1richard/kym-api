const sequelize = require('../../conn');
const getterMethods = require('./getterMethods');
const { config } = require('./config');

const Weight = sequelize.define('weight', config, {
  getterMethods
});

module.exports = Weight;
