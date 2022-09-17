const router = require('express').Router();
const { handleRouteError } = require('../../../utils/handleRouteError');
const getCalories = require('./controllers/getCalories');
const { dateSchema } = require('./controllers/getCalories/validation');

module.exports = router;

router.get('/calories', async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    await dateSchema.validate(startDate);
    await dateSchema.validate(endDate);

    const activeCalories = await getCalories(res.locals.uuid, startDate, endDate);

    res.json(activeCalories);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t get calories from Fitbit');
    next(err);
  }
});
