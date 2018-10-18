/**
 * Abbrev module
 * @module models/abbrev
 * @see module:abbrevclassMethods
 */

const sequelize = require('../../conn');
const Weight = require('../weight');
const AbbrevMicro = require('../abbrev-micro');
const FoodDesc = require('../food-des');

const calculateMacros = require('./classMethods/calculateMacros');
const fpCalculateMacros = require('./classMethods/fpCalculateMacros');
const dayCalculation = require('./classMethods/dayCalculation');
const getterMethods = require('./getterMethods');
const beforeBulkCreate = require('./hooks/beforeBulkCreate');

const { Sequelize } = sequelize;
const macroType = () => ({
  type: Sequelize.DECIMAL,
  allowNull: false,
  validate: {
    min: 0
  }
});

const titleType = () => ({
  type: Sequelize.TEXT,
  allowNull: false
});

/**
 * define the database model, abbrev
 * @see foodDesTypes
 */
const Abbrev = sequelize.define('abbrev', {
  Main: titleType(),
  Sub: titleType(),
  Calories: macroType(),
  Protein: macroType(),
  Fat: macroType(),
  Carbohydrates: macroType(),
  GmWt_1: {
    type: Sequelize.DECIMAL
  },
  GmWt_Desc1: {
    type: Sequelize.STRING
  },
  GmWt_2: {
    type: Sequelize.DECIMAL
  },
  GmWt_Desc2: {
    type: Sequelize.STRING
  },
  UserID: {
    type: Sequelize.INTEGER
  },
  photo: {
    type: Sequelize.STRING
  },
}, {
  defaultScope: {
    include: [
      Weight,
      // AbbrevMicro,
      FoodDesc
    ]
  },
  getterMethods,
  scopes: {
    weight: {
      include: [Weight]
    },
    foodGroup: {
      include: [FoodDesc.scope('foodGroup')]
    },
    micro: {
      include: [AbbrevMicro]
    },
    all: {
      include: [
        Weight,
        AbbrevMicro,
        FoodDesc
      ]
    }
  },
  hooks: {
    beforeBulkCreate
  }
});

Abbrev.calculateMacros = calculateMacros;
Abbrev.fpCalculateMacros = fpCalculateMacros;
Abbrev.dayCalculation = dayCalculation;

module.exports = Abbrev;
