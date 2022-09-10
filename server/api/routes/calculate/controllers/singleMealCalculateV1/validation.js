const Joi = require('joi');
const ValidationError = include('configure/ValidationError');

const INVALID_GOAL_PROTEIN = 'INVALID_GOAL_PROTEIN';
const INVALID_GOAL_CARBOHYDRATES = 'INVALID_GOAL_CARBOHYDRATES';
const INVALID_GOAL_FAT = 'INVALID_GOAL_FAT';

const proteinGoalSchema = Joi.number().required().error(() => new ValidationError(INVALID_GOAL_PROTEIN));
const carbGoalSchema = Joi.number().required().error(() => new ValidationError(INVALID_GOAL_CARBOHYDRATES));
const fatGoalSchema = Joi.number().required().error(() => new ValidationError(INVALID_GOAL_FAT));
const idIndSchema = Joi.number().integer();

const querySchema = Joi.object().keys({
  proteinGoal: proteinGoalSchema,
  carbGoal: carbGoalSchema,
  fatGoal: fatGoalSchema,
  id: Joi.array().items(idIndSchema),
});

module.exports = {
  proteinGoalSchema,
  carbGoalSchema,
  fatGoalSchema,
  idIndSchema,
  querySchema,
  errorMessages: {
    INVALID_GOAL_CARBOHYDRATES,
    INVALID_GOAL_FAT,
    INVALID_GOAL_PROTEIN,
  },
};
