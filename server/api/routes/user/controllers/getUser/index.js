const AppError = include('configure/appError');
const { User } = include('db');

const getUser = async (req, res, next) => {
  try {
    const { uuid } = res.locals;
    if (!uuid) {
      throw new Error('No uuid provided');
    }
    const user = await User.scope(
      'measurements',
      'meal-goals',
      'programs'
    ).findById(uuid);

    // Make sure we have the user. If not, send back a 404
    if (!user) {
      throw new AppError(404, {
        devmessage: `The user with id '${uuid}' could not be located`,
        usermessage: 'We couldn\'t log you in'
      }, true);
    }

    const sanitizedUser = await User.sanitizeUser(user);
    
    res.json(sanitizedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = getUser;
