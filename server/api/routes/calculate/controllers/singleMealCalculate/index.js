const { Abbrev } = include('db');
const { querySchema } = require('./validation');

const singleMealCalculate = async (query) => {
  // Validate
  querySchema.validate(query);

  const {
    proteinGoal,
    carbGoal,
    fatGoal,
    id
  } = query;

  const goals = {
    proteinGoal,
    carbGoal,
    fatGoal
  };

  const output = await Abbrev.calculateMacros(goals, id);

  return output;
};

module.exports = singleMealCalculate;
