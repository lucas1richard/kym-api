const { UserApi } = require('@kym/db');
const jwt = require('jwt-simple');

const signInV1 = async ({ email, password }) => {
  const user = await UserApi.findByPassword({
    credentials: {
      email,
      password,
    },
  });

  if (user) return jwt.encode(user.uuid, process.env.JWT_SECRET);

  throw new Error('Invalid login');
};

module.exports = signInV1;
