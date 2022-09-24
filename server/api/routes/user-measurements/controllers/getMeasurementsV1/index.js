const { connectDatabase, foreignKeys } = require('@kym/db');
const { UserMeasurement } = connectDatabase();

const getMeasurementsV1 = async ({ uuid }) => {
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
};

module.exports = getMeasurementsV1;
