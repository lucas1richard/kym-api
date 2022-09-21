const { connectDatabase } = require('@kym/db');
const { User } = connectDatabase();
const jwt = require('jwt-simple');

const signInV1 = async ({ email, password }) => {
  const user = await User.findByPassword({
    credentials: {
      email,
      password,
    },
  });

  if (user) return jwt.encode(user.uuid, process.env.JWT_SECRET);

  throw new Error('Invalid login');
};

module.exports = signInV1;
