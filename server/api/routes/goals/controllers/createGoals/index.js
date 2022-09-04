const { connectDatabase, foreignKeys } = require('@kym/db');
const { handleRouteError } = include('utils/handleRouteError');
const { bodySchema } = require('./validation');

const {
  MealGoals, User, UserMeasurement, Program, sequelize,
} = connectDatabase();

const createGoals = async (req, res, next) => {
  try {
    // Validate
    await bodySchema.validate(req.body);

    await MealGoals.create({
      goals: req.body,
      [foreignKeys.USER]: res.locals.uuid
    });

    const user = await User.findByPk(res.locals.uuid, {
      include: [{
        model: UserMeasurement,
        order: [
          ['id', 'desc'],
        ],
      }, {
        model: MealGoals,
        order: [
          sequelize.fn('max', sequelize.col('id')),
        ],
      }, {
        model: Program,
        order: [
          sequelize.fn('max', sequelize.col('id')),
        ],
      }],
    });

    res.json(user);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t create new goals');
    next(err);
  }
};

module.exports = createGoals;
