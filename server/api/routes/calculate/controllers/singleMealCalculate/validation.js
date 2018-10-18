const Joi = require('joi');

const proteinGoalSchema = Joi.number().required().error(() => 'The protein goal must be a number');
const carbGoalSchema = Joi.number().required().error(() => 'The carb goal must be a number');
const fatGoalSchema = Joi.number().required().error(() => 'The fat goal must be a number');
const idIndSchema = Joi.number().integer().required().error(() => 'The id must be a number');

const querySchema = Joi.object().keys({
  proteinGoal: proteinGoalSchema,
  carbGoal: carbGoalSchema,
  fatGoal: fatGoalSchema,
  id: Joi.array().items(idIndSchema)
});

module.exports = {
  proteinGoalSchema,
  carbGoalSchema,
  fatGoalSchema,
  idIndSchema,
  querySchema
};
