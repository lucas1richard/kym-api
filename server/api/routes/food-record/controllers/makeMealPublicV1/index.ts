import { MealApi } from '@kym/db';
import Joi from 'joi';

const mealIdSchema = Joi.number().integer().required().error(() => 'MEAL_ID_REQUIRED');

const makeMealPublic = async ({ mealId, uuid }: { mealId: number, uuid: string }) => {
  await mealIdSchema.validate(mealId);
  const meal = await MealApi.makeMealPublic({ mealId, uuid });

  return meal;
};

export default makeMealPublic;
module.exports = makeMealPublic;
