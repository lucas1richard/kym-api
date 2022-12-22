import { UserApi } from '@kym/db';
import jwt from 'jwt-simple';

type SignInV1Arg = { email: string, password: string };

const signInV1 = async ({ email, password }: SignInV1Arg) => {
  const user = await UserApi.findByPassword({
    credentials: {
      email,
      password,
    },
  });

  if (user) return jwt.encode(user.uuid, process.env.JWT_SECRET as string);

  throw new Error('Invalid login');
};

module.exports = signInV1;
