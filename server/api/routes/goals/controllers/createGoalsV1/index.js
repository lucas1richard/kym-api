const { connectDatabase, foreignKeys } = require('@kym/db');
const { bodySchema } = require('./validation');

const { MealGoals } = connectDatabase();

const createGoalsV1 = async ({ uuid, goals }) => {
  await bodySchema.validate(goals);

  const newGoals = await MealGoals.create({
    goals,
    [foreignKeys.USER]: uuid,
  });

  // const user = await User.scope(
  //   'withMeasurements',
  //   'withMealGoals',
  //   'withPrograms',
  // ).findByPk(uuid);

  return {
    ...newGoals.toJSON(),
    createdAt: undefined,
    updatedAt: undefined,
  };
};

module.exports = createGoalsV1;
