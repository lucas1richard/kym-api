const { connectDatabase, foreignKeys } = require('@kym/db');
const { MealGoals } = connectDatabase();
const { handleRouteError } = include('utils/handleRouteError');
const { bodySchema } = require('./validation');

const createMealGoals = async (req, res, next) => {
  try {
    // Validate
    await bodySchema.validate(req.body.mealGoals);

    // Create the new goals
    const mealGoals = await MealGoals.create({
      goals: req.body.mealGoals,
      [foreignKeys.USER]: res.locals.uuid,
    });

    res.json(mealGoals);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t create new goals');
    next(err);
  }
};

module.exports = createMealGoals;
