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
const foodGroups = require('../test-data/fd-group.json');
const foodRecords = require('../test-data/food-record.json');
const foodDesc = require('../test-data/food-des.json');
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
  foodGroups,
  foodDesc,
  foodRecords,
  meals,
  mealGoals,
  weights,
  filteredMealsObject,
  tokens: {
    user0: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1dWlkIjoiNjBmMjQyNjUtZWY0NS00ODkxLWI0ZWYtZThmYWQ0NDM1MzA4In0.ZiPnFVy1lBRzmrGEUX0d0KVoa9kZ9dsGsnENOfozzoA',
    user1: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjIiLCJ1dWlkIjoiMmE0MTNlZmYtNmVhYi00NGY0LWFhZmEtNDg1ZTgxNGIwMjViIn0.ji7ATKYy-HhRyzGPfsK7y5BnhrB7_SwOZQTHscLdPDk',
  },
};
