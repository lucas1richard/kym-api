const { connectDatabase, foreignKeys } = require('@kym/db');

const { MealGoals } = connectDatabase();

/** Get *only* the meal goals */
const getMealGoalsV1 = async ({ uuid }) => {
  const mealGoals = await MealGoals.findAll({
    where: { [foreignKeys.USER]: uuid },
    order: [['id', 'DESC']],
  });
  return mealGoals;
};

module.exports = getMealGoalsV1;
