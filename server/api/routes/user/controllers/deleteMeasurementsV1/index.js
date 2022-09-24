const { connectDatabase, foreignKeys } = require('@kym/db');
const { UserMeasurement } = connectDatabase();
const { idSchema } = require('./validation');

const deleteMeasurementsV1 = async ({ id, uuid }) => {
  await idSchema.validate(id);

  await UserMeasurement.destroy({
    where: {
      id,
      [foreignKeys.USER]: uuid,
    },
  });
};

module.exports = deleteMeasurementsV1;
