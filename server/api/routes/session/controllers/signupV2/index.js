const { UserApi } = require('@kym/db');
const jwt = require('jwt-simple');
const { bodySchema } = require('./validation');

const signupV1 = async ({ jwtSecret, data }) => {
  await bodySchema.validate(data);

  const user = await UserApi.createUser({ data });

  const token = jwt.encode(user.uuid, jwtSecret);

  return { token, user };
};

module.exports = signupV1;
