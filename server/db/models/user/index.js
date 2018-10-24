const sequelize = require('../../conn');

const { config } = require('./config');
const {
  defaultScope,
  scopes
} = require('./scopes');
const { hooks } = require('./hooks');
const getterMethods = require('./getterMethods');

const {
  addFavoriteFood,
  removeFavoriteFood,
  exRefreshToken,
  findByPassword,
  setupFitbit,
  requestCalories,
  requestFoodLog,
  sanitizeUser
} = require('./classMethods');


const User = sequelize.define('user', config, {
  defaultScope,
  scopes,
  getterMethods,
  hooks
});

User.addFavoriteFood = addFavoriteFood;
User.removeFavoriteFood = removeFavoriteFood;
User.exRefreshToken = exRefreshToken;
User.findByPassword = findByPassword;
User.setupFitbit = setupFitbit;
User.requestCalories = requestCalories;
User.requestFoodLog = requestFoodLog;
User.sanitizeUser = sanitizeUser;

module.exports = User;
