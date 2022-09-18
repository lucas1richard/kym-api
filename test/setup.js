require('babel-polyfill');
require('dotenv').config();
const supertest = require('supertest');
const path = require('path');
const app = require('../server/app');

global.base_dir = path.resolve(__dirname, '..', 'server');

global.abs_path = (pth) => global.base_dir + pth;

// eslint-disable-next-line import/no-dynamic-require
global.include = (file) => require(global.abs_path(`/${file}`));

const users = require('../test-data/users.json');
const userMeasurements = require('../test-data/user-measurements.json');
const abbrevs = require('../test-data/abbrev.json');
const days = require('../test-data/days.json');
const foodGroups = require('../test-data/fd-group.json');
const foodRecords = require('../test-data/food-record.json');
const foodDesc = require('../test-data/food-des.json');
const abbrevsMicro = require('../test-data/abbrev-micro.json');
const meals = require('../test-data/meals.json');
const mealGoals = require('../test-data/meal-goals.json');
const weights = require('../test-data/weight.json');
const filteredMealsObject = require('../test-data/filteredMealsObject.json');
const { connectDatabase } = require('@kym/db');

const tokens = {
  user0: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjYwZjI0MjY1LWVmNDUtNDg5MS1iNGVmLWU4ZmFkNDQzNTMwOCI.LuRpYNcpwae3lJSHMfB727LewwjRb9Kb7Gh8v2BGsLw',
  user1: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjJhNDEzZWZmLTZlYWItNDRmNC1hYWZhLTQ4NWU4MTRiMDI1YiI.Rfva259Cm-7wtGA5TZ-3YxFR7ExjU2z_UkZaiY7HxVw',
};

const superagent = supertest.agent(app);
const agent = {
  ...superagent,
  getWithToken: (route) => superagent.get(route).set('token', tokens.user0),
  postWithToken: (route) => superagent.post(route).set('token', tokens.user0),
  deleteWithToken: (route) => superagent.delete(route).set('token', tokens.user0),
  putWithToken: (route) => superagent.put(route).set('token', tokens.user0),
  sendWithToken: (route, method) => superagent[method](route).set('token', tokens.user0),
};

agent.prototype = superagent.prototype;

// const { connectDatabase } = require('@kym/db');
// const { User } = connectDatabase();
// User.bulkCreate(users).then(() => process.exit());

const testData = {
  users,
  userMeasurements,
  abbrevs,
  abbrevsMicro,
  days,
  foodGroups,
  foodDesc,
  foodRecords,
  meals,
  mealGoals,
  weights,
  filteredMealsObject,
  tokens,
};

const globals = {
  destroyAllHook: async () => {
    const { destroyAll } = connectDatabase();
    await destroyAll();
  },
  seedTestData: async () => {
    const {
      User,
      UserMeasurement,
      Meal,
      Abbrev,
      AbbrevMicro,
      FoodRecord,
      FoodGroup,
      FoodDesc,
      Weight,
      Day,
      sequelize,
    } = connectDatabase();
    await Promise.all([
      User.bulkCreate(testData.users),
      FoodGroup.bulkCreate(testData.foodGroups),
    ]);
    await Promise.all([
      Abbrev.bulkCreate(testData.abbrevs),
      UserMeasurement.bulkCreate(testData.userMeasurements),
      Day.bulkCreate(testData.days),
      Meal.bulkCreate(testData.meals),
    ]);
    await Promise.all([
      FoodRecord.bulkCreate(testData.foodRecords),
      AbbrevMicro.bulkCreate(testData.abbrevsMicro),
      FoodDesc.bulkCreate(testData.foodDesc),
      Weight.bulkCreate(testData.weights),
    ]);
    await Promise.all([
      sequelize.query('ALTER SEQUENCE abbrevs_id_seq RESTART WITH 8804'),
      sequelize.query('ALTER SEQUENCE "abbrevMicros_id_seq" RESTART WITH 8463'),
      sequelize.query('ALTER SEQUENCE "foodDescs_id_seq" RESTART WITH 8650'),
      sequelize.query('ALTER SEQUENCE "weights_id_seq" RESTART WITH 15242'),
      sequelize.query('ALTER SEQUENCE "foodRecords_id_seq" RESTART WITH 6037'),
      sequelize.query('ALTER SEQUENCE "meals_id_seq" RESTART WITH 6037'),
    ]);
  },
  agent,
  testData,
};

global.globals = globals;

global.agent = agent; // deprecate
global.testData = testData; // deprecate
