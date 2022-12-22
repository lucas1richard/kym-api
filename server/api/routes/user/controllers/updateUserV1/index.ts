import { UserApi } from '@kym/db';
import { User } from '@kym/db/types/basics';
import Joi from 'joi';

type UpdateUserV1Arg = {
  data: User;
  uuid: string;
};

const bodySchema = Joi.object().keys({
  firstname: Joi.string().allow(null).optional(),
  lastname: Joi.string().allow(null).optional(),
  // username: Joi.string().allow(null).optional(),
  email: Joi.string().email().allow(null).optional(),
  password: Joi.string().allow(null).optional(),
  birthdate: Joi.date().allow(null).optional(),
  googleId: Joi.string().valid(null).allow(null).optional(),
  fitbitId: Joi.string().allow(null).optional(),
  fitbitToken: Joi.string().allow(null).optional(),
  fitbitRefreshToken: Joi.string().allow(null).optional(),
});

const updateUserV1 = async ({ data, uuid }: UpdateUserV1Arg) => {
  await bodySchema.validate(data, { abortEarly: false, allowUnknown: true });
  return UserApi.updateUser({ data, uuid });
};

module.exports = updateUserV1;
