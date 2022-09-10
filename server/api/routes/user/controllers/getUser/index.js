const AppError = include('configure/appError');
const { connectDatabase } = require('@kym/db');
const {
  User,
} = connectDatabase();

const getUser = async (req, res, next) => {
  try {
    const { uuid } = res.locals;
    if (!uuid) {
      throw new Error('No uuid provided');
    }
    const user = await User.scope(
      'withMeasurements',
      'withMealGoals',
      'withPrograms',
    ).findByPk(uuid);

    // Make sure we have the user. If not, send back a 404
    if (!user) {
      throw new AppError(404, {
        devmessage: 'USER_NOT_FOUND',
        usermessage: 'USER_NOT_FOUND',
      }, true);
    }

    const sanitizedUser = await User.sanitize(user);

    res.json(sanitizedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = getUser;
