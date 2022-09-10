const { connectDatabase, foreignKeys } = require('@kym/db');
const { UserMeasurement } = connectDatabase();

module.exports = createMeasurements;

async function createMeasurements(uuid) {
  const measurements = await UserMeasurement.findAll({
    where: {
      [foreignKeys.USER]: uuid,
    },
    order: [
      [
        'date',
        'DESC',
      ],
    ],
  });
  return measurements;
}
