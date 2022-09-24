const router = require('express').Router();
const getMeasurements = require('./controllers/getMeasurementsV1');

module.exports = router;

router.get('/v1', async function getUserMeasurements(req, res, next) {
  const measurements = await getMeasurements({ uuid: res.locals.uuid });
  res.json(measurements);
});
