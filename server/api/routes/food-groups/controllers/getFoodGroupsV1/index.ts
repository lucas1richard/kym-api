import { FoodGroupApi } from '@kym/db';

const getFoodGroupsV1 = async () => {
  const groups = await FoodGroupApi.findAllGroups();
  return groups;
};

module.exports = getFoodGroupsV1;
