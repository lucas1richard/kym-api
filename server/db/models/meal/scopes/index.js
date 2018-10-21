const FoodRecord = require('../../food-record');

const scopes = {
  records: {
    include: [FoodRecord]
  }
};

module.exports = {
  scopes
};
