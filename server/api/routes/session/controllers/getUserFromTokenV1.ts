import { UserApi } from '@kym/db';
import jwt from 'jwt-simple';

type GetUserFromTokenV1Arg = {
  token: string;
  jwtSecret: string;
};

const getUserFromTokenV1 = async ({ token, jwtSecret }: GetUserFromTokenV1Arg) => {
  const uuid = jwt.decode(token, jwtSecret);

  const user = await UserApi.findByUuid(uuid);
  const sanitizedUser = UserApi.sanitizeUser(user);

  return sanitizedUser;
};

module.exports = getUserFromTokenV1;
