const { UserMeasurement } = include('db');
const moment = require('moment');
const { bodySchema } = require('./validation');

const createMeasurements = async (body, user_id) => {
  await bodySchema.validate(body, {
    allowUnknown: true
  });

  /** Existing record */
  let currentDayMeas;
  if (body.createdAt) {
    const startDate = new Date(new Date(body.date).setHours(0, 0, 0, 0));
    const endDate = new Date(moment(body.date).add(1, 'day'));

    currentDayMeas = await UserMeasurement.find({
      where: {
        createdAt: {
          $between: [
            startDate,
            endDate
          ]
        },
        user_id
      }
    });
  }

  // If there's an existing record, update it instead of creating a new one
  if (currentDayMeas) {
    Object.keys(body).forEach((key) => {
      currentDayMeas[key] = body[key];
    });

    await currentDayMeas.save();
  } else {
    await UserMeasurement.create(Object.assign(body, { user_id }));
  }

  const allMeasurements = await UserMeasurement.findAllByUserId(user_id);
  return allMeasurements;
};

module.exports = createMeasurements;
