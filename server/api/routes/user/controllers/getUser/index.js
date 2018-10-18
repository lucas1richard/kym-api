const AppError = include('configure/appError');
const { User } = include('db');

const getUser = async (req, res, next) => {
  try {
    const { user_id } = res.locals;
    if (!user_id) {
      throw new Error('No user_id provided');
    }
    const user = await User.scope(
      'measurements',
      'meal-goals',
      'programs'
    ).findById(user_id);

    // Make sure we have the user. If not, send back a 404
    if (!user) {
      throw new AppError(404, {
        devmessage: `The user with id '${user_id}' could not be located`,
        usermessage: 'We couldn\'t log you in'
      }, true);
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = getUser;
