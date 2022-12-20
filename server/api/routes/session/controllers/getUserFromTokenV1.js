const { connectDatabase, UserApi } = require('@kym/db');
const { User } = connectDatabase();
const jwt = require('jwt-simple');

const getUserFromTokenV1 = async ({ token, jwtSecret }) => {
  const uuid = jwt.decode(token, jwtSecret);

  const user = await UserApi.findByUuid(uuid);

  const sanitizedUser = await User.sanitize(user);

  return sanitizedUser;
};

module.exports = getUserFromTokenV1;
