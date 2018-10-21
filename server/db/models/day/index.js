const sequelize = require('../../conn');
const { config } = require('./config');

const Day = sequelize.define('day', config);

module.exports = Day;
