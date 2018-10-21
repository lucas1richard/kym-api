const { USER } = include('db/foreignKeys');
const { UserMeasurement } = include('db');

module.exports = createMeasurements;

async function createMeasurements(uuid) {
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
