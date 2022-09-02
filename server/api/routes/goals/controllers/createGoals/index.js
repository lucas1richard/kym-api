const { connectDatabase, foreignKeys } = require('@kym/db');
const { MealGoals, User } = connectDatabase();
const { handleRouteError } = include('utils/handleRouteError');
const { bodySchema } = require('./validation');

const createGoals = async (req, res, next) => {
  try {
    // Validate
    await bodySchema.validate(req.body);

    await MealGoals.create({
      goals: req.body,
      [foreignKeys.USER]: res.locals.uuid
    });

    const user = await User.scope(
      'measurements',
      'meal-goals',
      'programs'
    ).findById(res.locals.uuid);

    res.json(user);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t create new goals');
    next(err);
  }
};

module.exports = createGoals;
