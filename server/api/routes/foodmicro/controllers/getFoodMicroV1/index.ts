import { AbbrevApi } from '@kym/db';
import { Abbrev } from '@kym/db/types/basics';
import Joi from 'joi';

const idSchema = Joi.number().required().error(() => 'ID_MUST_BE_NUMBER');

const getFoodMicroV1 = async ({ id }: { id: number }) => {
  await idSchema.validate(id);

  const food = await AbbrevApi.findById(
    id,
    {
      withWeight: true,
      withMicro: true,
      withFoodDesc: true,
      withFoodGroup: true,
    }
  ) as Abbrev<{
    withWeight: true,
    withMicro: true,
    withFoodDesc: true,
    withFoodGroup: true,
  }>;

  return food;
};

module.exports = getFoodMicroV1;
