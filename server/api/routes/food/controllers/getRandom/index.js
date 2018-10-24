const {
  Abbrev,
  sequelize
} = include('db');

async function getRandomFood() {
  const randomFood = await Abbrev.findOne({ order: sequelize.random() });
  return randomFood;
}

module.exports = getRandomFood;
