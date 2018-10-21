const sequelize = require('../../conn');
const { config } = require('./config');

const FoodGroup = sequelize.define('foodGroup', config);

module.exports = FoodGroup;
