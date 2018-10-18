/**
 * @module models/food-des
 */

const sequelize = require('../../conn');
const FoodGroup = require('../food-group');
const getBestGroup = require('./classMethods/getBestGroup');

const { Sequelize } = sequelize;

const decimalType = () => ({
  type: Sequelize.DECIMAL
});

const stringType = () => ({
  type: Sequelize.STRING
});

const textType = () => ({
  type: Sequelize.TEXT
});

const FoodDesc = sequelize.define('foodDesc', {
  Long_Desc: textType(),
  Short_Desc: stringType(),
  ComName: stringType(),
  ManufacName: stringType(),
  Survey: stringType(),
  Ref_desc: stringType(),
  Refuse: {
    type: Sequelize.INTEGER
  },
  SciName: textType(),
  N_Factor: decimalType(),
  Pro_Factor: decimalType(),
  Fat_Factor: decimalType(),
  CHO_Factor: decimalType()
}, {
  defaultScope: {
    // include: [
    //   FoodGroup
    // ]
  },
  scopes: {
    foodGroup: {
      include: [FoodGroup]
    }
  }
});

FoodDesc.getBestGroup = getBestGroup;

module.exports = FoodDesc;
