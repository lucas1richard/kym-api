require('babel-polyfill');
require('dotenv').config();
const path = require('path');

global.base_dir = path.resolve(__dirname, '..', 'server');

global.abs_path = (pth) => global.base_dir + pth;

// eslint-disable-next-line import/no-dynamic-require
global.include = (file) => require(global.abs_path(`/${file}`));

const logger = include('utils/logger');
logger.verbose('mocha setup complete');


const users = require('../test-data/users.json');
const userMeasurements = require('../test-data/user-measurements.json');
const abbrevs = require('../test-data/abbrev.json');
const foodRecords = require('../test-data/food-record.json');
const abbrevsMicro = require('../test-data/abbrev-micro.json');
const meals = require('../test-data/meals.json');
const mealGoals = require('../test-data/meal-goals.json');
const weights = require('../test-data/weight.json');
const filteredMealsObject = require('../test-data/filteredMealsObject.json');

global.testData = {
  users,
  userMeasurements,
  abbrevs,
  abbrevsMicro,
  foodRecords,
  meals,
  mealGoals,
  weights,
  filteredMealsObject,
};

