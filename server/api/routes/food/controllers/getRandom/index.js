const { connectDatabase } = require('@kym/db');
const { Abbrev, sequelize } = connectDatabase();

async function getRandomFood() {
  const randomFood = await Abbrev.findOne({ order: sequelize.random() });
  return randomFood;
}

module.exports = getRandomFood;
