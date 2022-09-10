const { handleRouteError } = include('utils/handleRouteError');
const { connectDatabase, foreignKeys } = require('@kym/db');
const { UserMeasurement } = connectDatabase();
const { bodySchema } = require('./validation');

const deleteMeasurements = async (req, res, next) => {
  try {
    await bodySchema.validate(req.body);

    const { id } = req.body;
    const { uuid } = res.locals;

    await UserMeasurement.destroy({
      where: {
        id,
        [foreignKeys.USER]: uuid,
      },
    });

    res.status(200).send('SUCCESS');
  } catch (err) {
    handleRouteError(err, 'Couldn\'t delete measurements');
    next(err);
  }
};

module.exports = deleteMeasurements;
