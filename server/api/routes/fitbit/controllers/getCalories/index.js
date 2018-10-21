const { handleRouteError } = include('utils/handleRouteError');
const { dateSchema } = require('./validation');
const getCaloriesMeta = require('./getCalories');

const getCalories = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    await dateSchema.validate(startDate);
    await dateSchema.validate(endDate);

    const activeCalories = await getCaloriesMeta(res.locals.uuid, startDate, endDate);

    res.json(activeCalories);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t get calories from Fitbit');
    next(err);
  }
};

module.exports = getCalories;
