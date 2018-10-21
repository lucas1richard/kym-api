const Weight = require('../../weight');
const AbbrevMicro = require('../../abbrev-micro');
const FoodDesc = require('../../food-des');

const defaultScope = {
  include: [
    Weight,
    // AbbrevMicro,
    FoodDesc
  ]
};

const scopes = {
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
};

module.exports = {
  scopes,
  defaultScope
};
