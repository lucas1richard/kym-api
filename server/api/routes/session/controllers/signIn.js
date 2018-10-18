const User = include('db/models/user');
const jwt = require('jwt-simple');

module.exports = signIn;

async function signIn(email, password, jwtSecret) {
  const user = await User.findByPassword({
    email,
    password
  });

  if (user) {
    return jwt.encode({ id: user.id }, jwtSecret);
  }

  throw new Error('Invalid login');
}
