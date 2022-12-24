import { AbbrevApi } from '@kym/db';
import Joi from 'joi';

const typeSchema = Joi
  .string()
  .valid(['REST', 'TRAIN'])
  .error(() => 'INVALID_GOAL_TYPE');

const bodySchema = Joi.object().keys({
  type: typeSchema,
});
const dayMealsCalculationV1 = async (body: { type: 'REST'|'TRAIN' }, uuid: string) => {
  await bodySchema.validate(body, { allowUnknown: true, abortEarly: false });
  const output = await AbbrevApi.dayCalculation({ uuid, type: body.type });

  return {
    foods: output,
    type: body.type,
    isConfirmed: false,
    uuid,
  };
};

export default dayMealsCalculationV1;
