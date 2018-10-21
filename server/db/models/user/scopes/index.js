const sequelize = require('../../../conn');
const UserMeasurement = require('../../user-measurements');
const MealGoals = require('../../meal-goals');
const Meal = require('../../meal');
const Program = require('../../program');
const Abbrev = require('../../abbrev');

const defaultScope = {
  include: [
    {
      model: Program,
      order: [
        sequelize.fn('max', sequelize.col('id'))
      ]
    }
  ]
};

const scopes = {
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
};

module.exports = {
  defaultScope,
  scopes
};
