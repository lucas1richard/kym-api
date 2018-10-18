const { FoodGroup } = include('db');

const getFoodGroups = async () => {
  const groups = await FoodGroup.findAll();
  return groups;
};

module.exports = getFoodGroups;
