const Joi = require('joi');
const { connectDatabase } = require('@kym/db');
const AppError = require('../../../../../configure/appError');
const { User } = connectDatabase();

const getUserV1 = async ({ uuid }) => {
  await Joi.string().required().error(() => 'UUID_REQUIRED').validate(uuid);
  const user = await User.scope(
    'withMeasurements',
    'withMealGoals',
    'withPrograms',
  ).findByPk(uuid);

  // Make sure we have the user. If not, send back a 404
  if (!user) throw new AppError(404, { devmessage: 'USER_NOT_FOUND' }, true);

  const sanitizedUser = await User.sanitize(user);

  return sanitizedUser;
};

module.exports = getUserV1;
