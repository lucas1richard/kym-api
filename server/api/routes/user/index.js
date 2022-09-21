const { handleRouteError } = include('utils/handleRouteError');
const router = require('express').Router();
const getUserV1 = require('./controllers/getUserV1');

const createMeasurementsV1 = require('./controllers/createMeasurementsV1');
const updateMeasurementsV1 = require('./controllers/updateMeasurementsV1');
const deleteMeasurementsV1 = require('./controllers/deleteMeasurementsV1');
const updateUserV1 = require('./controllers/updateUserV1');

module.exports = router;

router.get('/v1', async (req, res, next) => {
  try {
    const { uuid } = res.locals;
    const user = await getUserV1({ uuid });
    res.json(user);
  } catch (err) {
    /* istanbul ignore next */ handleRouteError(err, err.message);
    /* istanbul ignore next */ next(err);
  }
});

router.put('/v1', async function putUser(req, res, next) {
  try {
    const updatedUser = await updateUserV1({ data: req.body, uuid: res.locals.uuid });
    res.status(201).json(updatedUser);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t update your information');
    next(err);
  }
});

router.post('/measurements/v1', async function postUserMeasurements(req, res, next) {
  try {
    const measurements = await createMeasurementsV1({
      data: req.body,
      uuid: res.locals.uuid,
    });
    res.status(201).json(measurements);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});

router.put('/measurements/v1', async function putUserMeasurements(req, res, next) {
  try {
    const measurements = await updateMeasurementsV1({ data: req.body, uuid: res.locals.uuid });
    res.status(201).json(measurements);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t update measurements');
    next(err);
  }
});

router.delete('/measurements/v1', async (req, res, next) => {
  try {
    const { id } = req.body;
    const { uuid } = res.locals;
    await deleteMeasurementsV1({ id, uuid });
    res.sendStatus(204);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});
