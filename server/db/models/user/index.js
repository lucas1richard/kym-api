const sequelize = require('../../conn');

const { Sequelize } = sequelize;

const md5 = require('crypto-md5');

const UserMeasurement = require('../user-measurements');
const MealGoals = require('../meal-goals');
const Meal = require('../meal');
const Program = require('../program');
const Abbrev = require('../abbrev');

const {
  addFavoriteFood,
  removeFavoriteFood,
  exRefreshToken,
  findByPassword,
  setupFitbit,
  requestCalories,
  requestFoodLog
} = require('./classMethods');

const stringType = () => ({
  type: Sequelize.STRING,
});

const User = sequelize.define('user', {
  firstname: stringType(),
  lastname: stringType(),
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.TEXT,
    validate: {
      isEmail: true
    },
    unique: {
      args: true,
      msg: 'This email is already taken'
    }
  },
  password: stringType(),
  birthdate: {
    type: Sequelize.DATEONLY
  },
  googleId: stringType(),
  fitbitId: stringType(),
  fitbitToken: stringType(),
  fitbitRefreshToken: stringType()
}, {
  defaultScope: {
    include: [
      {
        model: Program,
        order: [
          sequelize.fn('max', sequelize.col('id'))
        ]
      }
    ]
  },
  scopes: {
    abbrev: {
      include: [Abbrev]
    },
    measurements: {
      include: [{
        model: UserMeasurement,
        order: [
          ['id', 'desc']
        ]
      }]
    },
    'meal-goals': {
      include: [{
        model: MealGoals,
        order: [
          sequelize.fn('max', sequelize.col('id'))
        ]
      }]
    },
    programs: {
      include: [{
        model: Program,
        order: [
          sequelize.fn('max', sequelize.col('id'))
        ]
      }]
    },
    meals: {
      include: [
        Meal.scope('records')
      ]
    }
  },
  hooks: {
    /* eslint-disable no-param-reassign */
    beforeCreate(user) {
      user.password = md5(user.password, 'hex');
      return user;
    },
    beforeBulkCreate(users) {
      users = users.map((user) => {
        user.password = md5(user.password, 'hex');
        return user;
      });
      return users;
    }
    /* eslint-enable */
  }
});

User.addFavoriteFood = addFavoriteFood;
User.removeFavoriteFood = removeFavoriteFood;
User.exRefreshToken = exRefreshToken;
User.findByPassword = findByPassword;
User.setupFitbit = setupFitbit;
User.requestCalories = requestCalories;
User.requestFoodLog = requestFoodLog;

module.exports = User;
