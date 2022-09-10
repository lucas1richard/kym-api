const { connectDatabase, foreignKeys } = require('@kym/db');
const { UserMeasurement } = connectDatabase();
const moment = require('moment');
const { bodySchema } = require('./validation');

const createMeasurements = async (body, uuid) => {
  const { error } = bodySchema.validate(body, {
    // allowUnknown: true,
    abortEarly: false,
  });

  if (error) throw error;

  const { date = moment().format('YYYY-MM-DD') } = body;

  /** Existing record */
  let currentDayMeas;
  if (body.createdAt) {
    const startDate = new Date(new Date(date).setHours(0, 0, 0, 0));
    const endDate = new Date(moment(date).add(1, 'day'));

    currentDayMeas = await UserMeasurement.find({
      where: {
        createdAt: {
          $between: [
            startDate,
            endDate,
          ],
        },
        [foreignKeys.USER]: uuid,
      },
    });
  }

  // If there's an existing record, update it instead of creating a new one
  if (currentDayMeas) {
    Object.keys(body).forEach((key) => {
      currentDayMeas[key] = body[key];
      currentDayMeas[date] = date;
    });

    await currentDayMeas.save();
  } else {
    await UserMeasurement.create(Object.assign(body, { date, [foreignKeys.USER]: uuid }));
  }

  const allMeasurements = await UserMeasurement.findAllByUserId({ uuid });
  return allMeasurements;
};

module.exports = createMeasurements;
