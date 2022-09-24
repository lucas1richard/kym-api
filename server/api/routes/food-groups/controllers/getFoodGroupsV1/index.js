const { connectDatabase } = require('@kym/db');
const { FoodGroup } = connectDatabase();

const getFoodGroupsV1 = async () => {
  const groups = await FoodGroup.findAll();
  return groups;
};

module.exports = getFoodGroupsV1;
