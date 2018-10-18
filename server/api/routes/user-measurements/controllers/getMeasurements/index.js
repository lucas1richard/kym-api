const { UserMeasurement } = include('db');

module.exports = getMeasurements;

async function getMeasurements(user_id) {
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
