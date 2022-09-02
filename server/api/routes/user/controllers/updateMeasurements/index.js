const { connectDatabase } = require('@kym/db');
const { UserMeasurement } = connectDatabase();
const { bodySchema } = require('./validation');

const updateMeasurements = async (body, uuid) => {
  await bodySchema.validate(body);
  const measurement = await UserMeasurement.findById(body.id);
  Object.assign(measurement, { ...body });
  await measurement.save();

  const allMeasurements = await UserMeasurement.findAllByUserId(uuid);
  return allMeasurements;
};

module.exports = updateMeasurements;
