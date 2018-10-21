const sequelize = require('../../conn');
const { config } = require('./config');
const { defaultScope, scopes } = require('./scopes');

const {
  calMacros,
  updateQuantity
} = require('./instanceMethods');

const {
  createWithMeal,
  findByDate,
  findMicroByDate,
  makeHistoricalArray
} = require('./classMethods');

const FoodRecord = sequelize.define('foodRecord', config, {
  defaultScope,
  scopes
});

FoodRecord.createWithMeal = createWithMeal;
FoodRecord.findByDate = findByDate;
FoodRecord.findMicroByDate = findMicroByDate;
FoodRecord.makeHistoricalArray = makeHistoricalArray;

FoodRecord.prototype.calMacros = calMacros;
FoodRecord.prototype.updateQuantity = updateQuantity;

module.exports = FoodRecord;
