import Joi from 'joi';
import { UserApi } from '@kym/db';
import AppError from '../../../../../configure/appError';

type GetUserV1Arg = { uuid: string };

const getUserV1 = async ({ uuid }: GetUserV1Arg) => {
  await Joi.string().required().error(() => 'UUID_REQUIRED').validate(uuid);
  const userRichData = await UserApi.findByUuidRichData(uuid);

  // Make sure we have the user. If not, send back a 404
  if (!userRichData) throw new AppError(404, { devmessage: 'USER_NOT_FOUND' }, true);

  const sanitizedUser = UserApi.sanitizeUser(userRichData);

  return sanitizedUser;
};

module.exports = getUserV1;
