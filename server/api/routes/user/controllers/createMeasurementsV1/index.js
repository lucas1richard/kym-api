const { connectDatabase, foreignKeys, Op } = require('@kym/db');
const { UserMeasurement } = connectDatabase();
const moment = require('moment');
const { bodySchema } = require('./validation');

const createMeasurementsV1 = async ({ data, uuid }) => {
  await bodySchema.validate(data, { abortEarly: false });

  const { date = moment().format('YYYY-MM-DD') } = data;

  /** Existing record */
  let currentDayMeas;
  if (data.date) {
    const startDate = new Date(new Date(date).setHours(0, 0, 0, 0));

    currentDayMeas = await UserMeasurement.findOne({
      where: {
        date: {
          [Op.between]: [startDate, date],
        },
        [foreignKeys.USER]: uuid,
      },
    });
  }

  // If there's an existing record, update it instead of creating a new one
  if (currentDayMeas) {
    Object.keys(data).forEach((key) => {
      currentDayMeas[key] = data[key];
      currentDayMeas[date] = date;
    });

    await currentDayMeas.save();

    return currentDayMeas;
  } else {
    await UserMeasurement.create({ ...data, date, [foreignKeys.USER]: uuid });
  }

  const allMeasurements = await UserMeasurement.findOne({
    where: {
      [foreignKeys.USER]: uuid,
    },
    order: [['date', 'desc']],
  });
  return allMeasurements;
};

module.exports = createMeasurementsV1;
