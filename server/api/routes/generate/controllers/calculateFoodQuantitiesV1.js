const Joi = require('joi');
const { connectDatabase } = require('@kym/db');
const ValidationError = require('../../../../configure/ValidationError');
const { Abbrev } = connectDatabase();

const goalsSchema = Joi.object().keys({
  proteinGoal: Joi.number().required().error(() => new ValidationError('PROTEIN_GOAL_REQUIRED')),
  carbGoal: Joi.number().required().error(() => new ValidationError('CARB_GOAL_REQUIRED')),
  fatGoal: Joi.number().required().error(() => new ValidationError('FAT_GOAL_REQUIRED')),
}).required().error(() => new ValidationError('GOALS_REQUIRED'));

const calculateFoodQuantitiesV1 = async ({ goals } = {}) => {
  await goalsSchema.validate(goals, { abortEarly: false });
  const {
    proteinGoal,
    carbGoal,
    fatGoal,
  } = goals;

  const result = await Abbrev.fpCalculateMacros({
    proteinGoal,
    carbGoal,
    fatGoal,
  });

  return result;
};

module.exports = calculateFoodQuantitiesV1;
