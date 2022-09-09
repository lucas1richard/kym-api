const { connectDatabase, foreignKeys } = require('@kym/db');
const AppError = include('/configure/appError');

const { MealGoals } = connectDatabase();

/** Get *only* the meal goals */
const getMealGoals = async (uuid) => {
  const mealGoals = await MealGoals.findAll({
    where: { [foreignKeys.USER]: uuid },
    order: [['id', 'DESC']],
  });
  if (!mealGoals) {
    throw new AppError(404, {
      usermessage: 'Couldn\'t get your meal goals'
    }, true);
  }
  return mealGoals;
};

module.exports = getMealGoals;
