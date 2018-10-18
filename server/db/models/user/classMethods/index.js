const findByPassword = require('./findByPassword');
const setupFitbit = require('./setupFitbit');
const requestCalories = require('./requestCalories');
const requestFoodLog = require('./requestFoodLog');
const exRefreshToken = require('./exRefreshToken');
const addFavoriteFood = require('./addFavoriteFood');
const removeFavoriteFood = require('./removeFavoriteFood');

module.exports = {
  addFavoriteFood,
  removeFavoriteFood,
  exRefreshToken,
  findByPassword,
  setupFitbit,
  requestCalories,
  requestFoodLog
};
