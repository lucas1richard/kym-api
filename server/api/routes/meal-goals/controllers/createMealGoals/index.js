const { handleRouteError } = include('utils/handleRouteError');
const { MealGoals } = include('/db');
const { bodySchema } = require('./validation');

const createMealGoals = async (req, res, next) => {
  try {
    // Validate
    await bodySchema.validate(req.body.mealGoals);

    // Create the new goals
    const mealGoals = await MealGoals.create({
      goals: req.body.mealGoals,
      user_id: res.locals.user_id
    });

    res.json(mealGoals);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t create new goals');
    next(err);
  }
};

module.exports = createMealGoals;
