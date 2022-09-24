const { connectDatabase } = require('@kym/db');
const { Abbrev } = connectDatabase();
const { querySchema } = require('./validation');

const singleMealCalculateV1 = async (query) => {
  const { error } = querySchema.validate(query, { abortEarly: false });
  if (error) throw error;

  const {
    proteinGoal,
    carbGoal,
    fatGoal,
    id,
  } = query;

  const goals = {
    proteinGoal,
    carbGoal,
    fatGoal,
  };

  const output = await Abbrev.calculateMacros({ goals, abbrevIds: id });

  return output;
};

module.exports = singleMealCalculateV1;
