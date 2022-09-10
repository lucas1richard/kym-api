const { connectDatabase, foreignKeys } = require('@kym/db');
const { handleRouteError } = include('utils/handleRouteError');
const AppError = include('configure/appError');
const bodySchema = require('./validation');

const { Abbrev } = connectDatabase();
const { USER } = foreignKeys;

const deleteFood = async (req, res, next) => {
  try {
    // Validate
    await bodySchema.validate(req.body);

    const abbrev = await Abbrev.findById(req.body.id);
    if (!abbrev) {
      throw new AppError(404, {
        devmessage: 'Couldn\'t find the food you\'re trying to delete',
        usermessage: 'Couldn\'t delete a food which was created by another user',
      }, true);
    }

    const { uuid } = res.locals;

    if (abbrev[USER].toString() !== uuid.toString()) {
      throw new AppError(401, {
        devmessage: `User with id ${uuid} tried to delete food with id ${abbrev.id}`,
        usermessage: 'Couldn\'t delete a food which was created by another user',
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
