const sequelize = require('../../conn');

const findByDate = require('./classMethods/findByDate');
const { config } = require('./config');
const { scopes } = require('./scopes');

const Meal = sequelize.define('meal', config, {
  scopes
});

Meal.findByDate = findByDate;

module.exports = Meal;
