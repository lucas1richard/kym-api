const { handleRouteError } = include('utils/handleRouteError');
const AppError = include('configure/appError');
const { UserMeasurement } = include('db');
const { bodySchema } = require('./validation');

const deleteMeasurements = async (req, res, next) => {
  try {
    await bodySchema.validate(req.body);

    const { id } = req.body;
    const { user_id } = res.locals;

    const measurement = await UserMeasurement.findOne({
      where: {
        id,
        user_id
      }
    });

    if (measurement) {
      await measurement.destroy();
    } else {
      throw new AppError(404, {
        devmessage: `The record with id '${id}' could not be located`,
        usermessage: 'The record could not be located',
      }, true);
    }

    res.sendStatus(204);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t delete measurements');
    next(err);
  }
};

module.exports = deleteMeasurements;
