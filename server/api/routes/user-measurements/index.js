const router = require('express').Router();
const getMeasurements = require('./controllers/getMeasurements');

module.exports = router;

router.get('/', async function getUserMeasurements(req, res, next) {
  try {
    const measurements = await getMeasurements(res.locals.uuid);
    res.json(measurements);
  } catch (err) {
    next(err);
  }
});
