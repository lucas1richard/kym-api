import { AbbrevApi } from '@kym/db';
import Joi from 'joi';

type SingleMealCalculateV1Arg = {
  proteinGoal: number;
  carbGoal: number;
  fatGoal: number;
  id: number[];
};

const INVALID_GOAL_PROTEIN = 'INVALID_GOAL_PROTEIN';
const INVALID_GOAL_CARBOHYDRATES = 'INVALID_GOAL_CARBOHYDRATES';
const INVALID_GOAL_FAT = 'INVALID_GOAL_FAT';

const proteinGoalSchema = Joi.number().required().error(() => INVALID_GOAL_PROTEIN);
const carbGoalSchema = Joi.number().required().error(() => INVALID_GOAL_CARBOHYDRATES);
const fatGoalSchema = Joi.number().required().error(() => INVALID_GOAL_FAT);
const idIndSchema = Joi.number().integer();

const querySchema = Joi.object().keys({
  proteinGoal: proteinGoalSchema,
  carbGoal: carbGoalSchema,
  fatGoal: fatGoalSchema,
  id: Joi.array().items(idIndSchema),
});

const singleMealCalculateV1 = async (query: SingleMealCalculateV1Arg) => {
  const { error } = querySchema.validate(query, { abortEarly: false });
  if (error) throw error;

  const {
    id,
    ...goals
  } = query;

  const output = await AbbrevApi.calculateMacros({
    goals,
    abbrevIds: id,
    sensitive: true,
  });

  return output;
};

export default singleMealCalculateV1;
