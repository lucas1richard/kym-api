import { FoodGroupApi } from '@kym/db';
import Joi from 'joi';

const foodSchema = Joi.array().items(Joi.string().required()).required();

const getBestGroup = async ({ food }: { food: string }) => {
  await foodSchema.validate(food);
  return FoodGroupApi.getBestGroupByName({ food });
};

module.exports = getBestGroup;
export default getBestGroup;
