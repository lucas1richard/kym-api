const { MealGoals } = include('/db');
const AppError = include('/configure/appError');

/** Get *only* the meal goals */
const getMealGoals = async (user_id) => {
  const mealGoals = await MealGoals.findAll({ where: { user_id } });
  if (!mealGoals) {
    throw new AppError(404, {
      usermessage: 'Couldn\'t get your meal goals'
    }, true);
  }
  return mealGoals;
};

module.exports = getMealGoals;
