/**
 * @module models/food-des
 */

const sequelize = require('../../conn');
const getBestGroup = require('./classMethods/getBestGroup');
const {
  scopes,
  defaultScope
} = require('./scopes');
const { config } = require('./config');

const FoodDesc = sequelize.define('foodDesc', config, {

  defaultScope,

  scopes
});

FoodDesc.getBestGroup = getBestGroup;

module.exports = FoodDesc;
