const { UserMeasurement } = include('db');

module.exports = createMeasurements;

async function createMeasurements(user_id) {
  const measurements = await UserMeasurement.findAll({
    where: {
      user_id
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
