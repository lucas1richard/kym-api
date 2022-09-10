const { connectDatabase, foreignKeys } = require('@kym/db');
const { bodySchema } = require('./validation');
const AppError = include('configure/appError');

const { UserMeasurement } = connectDatabase();

const updateMeasurements = async (body, uuid) => {
  await bodySchema.validate(body);
  const measurement = await UserMeasurement.findOne({
    where: {
      id: body.id,
      [foreignKeys.USER]: uuid,
    },
  });

  if (!measurement) throw new AppError(400, { userMessage: 'MEASUREMENT_NOT_FOUND' });

  Object.assign(measurement, { ...body });
  await measurement.save();

  const allMeasurements = await UserMeasurement.findAllByUserId({ uuid });
  return allMeasurements;
};

module.exports = updateMeasurements;
