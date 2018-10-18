const { handleRouteError } = include('utils/handleRouteError');
const { Abbrev } = include('db');
const AppError = include('configure/appError');
const bodySchema = require('./validation');

const deleteFood = async (req, res, next) => {
  try {
    // Validate
    await bodySchema.validate(req.body);

    const abbrev = await Abbrev.findById(req.body.id);
    if (!abbrev) {
      throw new AppError(404, {
        devmessage: 'Couldn\'t find the food you\'re trying to delete',
        usermessage: 'Couldn\'t delete a food which was created by another user'
      }, true);
    }

    const { user_id } = res.locals;

    if (abbrev.UserID.toString() !== user_id.toString()) {
      throw new AppError(401, {
        devmessage: `User with id ${user_id} tried to delete food with id ${abbrev.id}`,
        usermessage: 'Couldn\'t delete a food which was created by another user'
      }, true);
    }
    await abbrev.destroy();
    res.sendStatus(204);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t delete the food');
    next(err);
  }
};

module.exports = deleteFood;
