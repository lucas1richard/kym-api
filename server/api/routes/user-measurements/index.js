const router = require('express').Router();
const getMeasurements = require('./controllers/getMeasurements');

module.exports = router;

router.get('/', async function getUserMeasurements(req, res, next) {
  try {
    console.log(res.locals);
    const measurements = await getMeasurements(res.locals.uuid);
    res.json(measurements);
  } catch (err) {
    next(err);
  }
});
