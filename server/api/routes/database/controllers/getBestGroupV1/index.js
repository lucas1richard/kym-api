const { connectDatabase, Op } = require('@kym/db');

const { FoodDesc } = connectDatabase();

const getBestGroup = async ({ food }) => {
  const foods = await FoodDesc.scope('withFoodGroup').findAll({
    where: {
      Long_Desc: { [Op.iLike]: `%${food}%` },
    },
  });

  const group = await FoodDesc.getBestGroup(foods);
  return group;
};

module.exports = getBestGroup;
