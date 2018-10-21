const FoodGroup = require('../../food-group');

const defaultScope = {
  // include: [
  //   FoodGroup
  // ]
};

const scopes = {
  foodGroup: {
    include: [FoodGroup]
  }
};

module.exports = {
  defaultScope,
  scopes
};
