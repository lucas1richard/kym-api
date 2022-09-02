const { connectDatabase, foreignKeys } = require('@kym/db');
const { UserMeasurement } = connectDatabase();

module.exports = getMeasurements;

async function getMeasurements(uuid) {
  const measurements = await UserMeasurement.findAll({
    where: {
      [foreignKeys.USER]: uuid
    },
    order: [
      [
        'date',
        'DESC'
      ]
    ]
  });
  return measurements;
}
