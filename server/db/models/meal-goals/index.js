const sequelize = require('../../conn');
const beforeCreate = require('./hooks/beforeCreate');
const beforeUpdate = require('./hooks/beforeUpdate');
const sanitizeMealGoal = require('./classMethods/sanitizeMealGoal');
const sanitize = require('./instanceMethods/sanitizeMealGoal');

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

MealGoals.prototype.sanitize = sanitize;

MealGoals.sanitizeMealGoal = sanitizeMealGoal;

module.exports = MealGoals;
