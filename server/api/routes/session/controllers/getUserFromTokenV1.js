const { connectDatabase } = require('@kym/db');
const { User } = connectDatabase();
const jwt = require('jwt-simple');

const getUserFromTokenV1 = async ({ token, jwtSecret }) => {
  const uuid = jwt.decode(token, jwtSecret);

  const user = await User.findByPk(uuid);

  const sanitizedUser = await User.sanitize(user);

  return sanitizedUser;
};

module.exports = getUserFromTokenV1;
