const sequelize = require('../../conn');

const { config } = require('./config');
const {
  defaultScope,
  scopes
} = require('./scopes');
const { hooks } = require('./hooks');

const {
  addFavoriteFood,
  removeFavoriteFood,
  exRefreshToken,
  findByPassword,
  setupFitbit,
  requestCalories,
  requestFoodLog
} = require('./classMethods');


const User = sequelize.define('user', config, {
  defaultScope,
  scopes,
  hooks
});

User.addFavoriteFood = addFavoriteFood;
User.removeFavoriteFood = removeFavoriteFood;
User.exRefreshToken = exRefreshToken;
User.findByPassword = findByPassword;
User.setupFitbit = setupFitbit;
User.requestCalories = requestCalories;
User.requestFoodLog = requestFoodLog;

module.exports = User;
