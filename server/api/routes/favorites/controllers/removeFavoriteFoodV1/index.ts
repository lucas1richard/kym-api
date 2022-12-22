import { UserApi } from '@kym/db';
import Joi from 'joi';

type RemoveFavoriteFoodArg = {
  uuid: string;
  abbrevId: number;
  meal: number;
};

const bodySchema = Joi.object().keys({
  uuid: Joi.string().required(),
  abbrevId: Joi.number().integer().required(),
  meal: Joi.number().integer().required(),
});

const removeFavoriteFood = async (arg: RemoveFavoriteFoodArg) => {
  await bodySchema.validate(arg);
  return UserApi.removeFavoriteFood(arg);
};

export default removeFavoriteFood;
