const { connectDatabase } = require('@kym/db');
const { FoodDesc, sequelize } = connectDatabase();

const getRandomFoodV1 = async (req, res, next) => {
  const food = await FoodDesc.scope('withAbbrev').findOne({
    order: sequelize.random(),
  });

  return food;
};

module.exports = getRandomFoodV1;
