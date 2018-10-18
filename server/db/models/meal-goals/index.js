const sequelize = require('../../conn');
const beforeCreate = require('./hooks/beforeCreate');
const beforeUpdate = require('./hooks/beforeUpdate');

const { Sequelize } = sequelize;

const MealGoals = sequelize.define('mealGoals', {
  goals: {
    type: Sequelize.JSON
  }
}, {
  hooks: {
    beforeCreate,
    beforeUpdate
  }
});

module.exports = MealGoals;
