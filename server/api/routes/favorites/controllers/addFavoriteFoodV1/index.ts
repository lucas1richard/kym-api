import { UserApi } from '@kym/db';
import Joi from 'joi';

type AddFavoriteFoodArg = {
  uuid: string;
  abbrevId: number;
  meal: number;
};

const bodySchema = Joi.object().keys({
  uuid: Joi.string().required(),
  abbrevId: Joi.number().required(),
  meal: Joi.number().required(),
});

const addFavoriteFood = async (arg: AddFavoriteFoodArg) => {
  await bodySchema.validate(arg, { abortEarly: false });
  return UserApi.addFavoriteFood(arg);
};

export default addFavoriteFood;
