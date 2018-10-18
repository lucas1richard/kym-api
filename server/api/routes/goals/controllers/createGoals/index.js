const { MealGoals, User } = include('/db');
const { handleRouteError } = include('utils/handleRouteError');
const { bodySchema } = require('./validation');

const createGoals = async (req, res, next) => {
  try {
    // Validate
    await bodySchema.validate(req.body);

    await MealGoals.create({
      goals: req.body,
      user_id: res.locals.user_id
    });

    const user = await User.scope(
      'measurements',
      'meal-goals',
      'programs'
    ).findById(res.locals.user_id);

    res.json(user);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t create new goals');
    next(err);
  }
};

module.exports = createGoals;
