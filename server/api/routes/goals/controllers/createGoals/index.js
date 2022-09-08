const { connectDatabase, foreignKeys } = require('@kym/db');
const { handleRouteError } = include('utils/handleRouteError');
const { bodySchema } = require('./validation');

const {
  MealGoals, User
} = connectDatabase();

const createGoals = async (req, res, next) => {
  try {
    // Validate
    await bodySchema.validate(req.body);

    await MealGoals.findOrCreate({
      goals: req.body,
      [foreignKeys.USER]: res.locals.uuid
    });

    const user = await User.scope(
      'withMeasurements',
      'withMealGoals',
      'withProgram'
    ).findByPk(res.locals.uuid);

    res.json(user);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t create new goals');
    next(err);
  }
};

module.exports = createGoals;
