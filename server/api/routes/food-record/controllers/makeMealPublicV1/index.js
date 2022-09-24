const { connectDatabase, foreignKeys } = require('@kym/db');
const AppError = require('../../../../../configure/appError');
const { mealIdSchema, userIdSchema } = require('./validation');
const { Meal } = connectDatabase();

const makeMealPublic = async ({ mealId, uuid } = {}) => {
  await mealIdSchema.validate(mealId);
  await userIdSchema.validate(uuid);

  const meal = await Meal.findOne({
    where: {
      id: mealId,
      [foreignKeys.USER]: uuid,
    },
  });

  if (!meal) throw new AppError(400, { devmessage: 'MEAL_NOT_FOUND' });

  meal.public = true;
  await meal.save();

  return {
    ...meal.toJSON(),
    updatedAt: undefined,
  };
};

module.exports = makeMealPublic;
