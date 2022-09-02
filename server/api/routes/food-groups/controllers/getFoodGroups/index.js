const { connectDatabase } = require('@kym/db');
const { FoodGroup } = connectDatabase();

const getFoodGroups = async () => {
  const groups = await FoodGroup.findAll();
  return groups;
};

module.exports = getFoodGroups;
