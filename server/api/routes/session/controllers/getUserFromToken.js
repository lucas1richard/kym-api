const { connectDatabase } = require('@kym/db');
const { User } = connectDatabase();
const AppError = include('configure/appError');
const jwt = require('jwt-simple');

const getUserFromToken = async (req, res, next) => {
  try {
    const token = jwt.decode(
      req.params.token,
      res.locals.jwtSecret,
    );

    const user = await User.findByPk(token.uuid);

    const sanitizedUser = await User.sanitize(user);

    if (!user) {
      throw new AppError(401, {
        usermessage: 'Could not log you in',
      }, true);
    }
    res.send(sanitizedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = getUserFromToken;
