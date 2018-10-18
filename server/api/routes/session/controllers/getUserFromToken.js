const { User } = include('db');
const AppError = include('configure/appError');
const jwt = require('jwt-simple');

const getUserFromToken = async (req, res, next) => {
  try {
    const token = jwt.decode(
      req.params.token,
      res.locals.jwtSecret
    );

    const user = await User.findById(token.id || token.token);

    if (!user) {
      throw new AppError(401, {
        usermessage: 'Could not log you in'
      }, true);
    }
    console.log(user);
    res.send(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = getUserFromToken;
