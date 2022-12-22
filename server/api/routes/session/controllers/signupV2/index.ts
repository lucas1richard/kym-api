import { UserApi } from '@kym/db';
import jwt from 'jwt-simple';
import Joi from 'joi';

type SignupV2 = {
  jwtSecret: string;
  data: any;
};

const bodySchema = Joi.object().keys({
  birthdate: Joi.date().required(),
  email: Joi.string().email().required(),
  firstname: Joi.string().regex(/^[a-zA-Z]+$/, 'letters only').required(),
  lastname: Joi.string().regex(/^[a-zA-Z]+$/, 'letters only').required(),
  password: Joi.string().required(),
  loggedIn: Joi.bool().required(),
  userMeasurements: Joi.any().optional(),
  preferredlocale: Joi.string().required(),
  // .pattern(/\.[a-z]{2}-[A-Z]{2}$/, { name: 'localeString' }).required(),
});

const signupV2 = async ({ jwtSecret, data }: SignupV2) => {
  await bodySchema.validate(data);
  const user = await UserApi.createUser({ data });
  const token = jwt.encode(user.uuid, jwtSecret);
  return { token, user };
};

module.exports = signupV2;
