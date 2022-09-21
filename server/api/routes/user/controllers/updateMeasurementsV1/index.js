const { connectDatabase, foreignKeys } = require('@kym/db');
const { bodySchema } = require('./validation');
const AppError = include('configure/appError');

const { UserMeasurement } = connectDatabase();

const updateMeasurementsV1 = async ({ data, uuid }) => {
  await bodySchema.validate(data);
  const measurement = await UserMeasurement.findOne({
    where: {
      id: data.id,
      [foreignKeys.USER]: uuid,
    },
  });

  if (!measurement) throw new AppError(400, { userMessage: 'MEASUREMENT_NOT_FOUND' });

  Object.assign(measurement, { ...data });
  await measurement.save();

  return measurement;
};

module.exports = updateMeasurementsV1;
