const { connectDatabase } = require('@kym/db');
const { User } = connectDatabase();
const jwt = require('jwt-simple');

module.exports = signIn;

async function signIn(email, password) {
  const user = await User.findByPassword({
    credentials: {
      email,
      password
    },
  });

  if (user) {
    return jwt.encode({ id: user.id, uuid: user.uuid }, process.env.JWT_SECRET);
  }

  throw new Error('Invalid login');
}
