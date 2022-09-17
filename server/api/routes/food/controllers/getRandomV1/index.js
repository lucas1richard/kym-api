const { connectDatabase } = require('@kym/db');
const { Abbrev, sequelize } = connectDatabase();

async function getRandomFoodV1() {
  const randomFood = await Abbrev.findOne({ order: sequelize.random() });
  return randomFood;
}

module.exports = getRandomFoodV1;
