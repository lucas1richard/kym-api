const { UserMeasurement } = include('db');
const { bodySchema } = require('./validation');

const updateMeasurements = async (body, user_id) => {
  await bodySchema.validate(body);
  const measurement = await UserMeasurement.findById(body.id);
  Object.assign(measurement, { ...body });
  await measurement.save();

  const allMeasurements = await UserMeasurement.findAllByUserId(user_id);
  return allMeasurements;
};

module.exports = updateMeasurements;
