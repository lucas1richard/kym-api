const { UserMeasurement } = include('db');
const { USER } = include('db/foreignKeys');

module.exports = getMeasurements;

async function getMeasurements(uuid) {
  const measurements = await UserMeasurement.findAll({
    where: {
      [USER]: uuid
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
