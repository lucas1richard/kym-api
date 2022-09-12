const { handleRouteError } = include('utils/handleRouteError');
const router = require('express').Router();
const getDaysV1 = require('./controllers/getDaysv1');
const createUpdateDaysV1 = require('./controllers/createUpdateDaysv1');
const destroyDaysV1 = require('./controllers/destroyDaysv1');

router.get('/days/v1', async (req, res, next) => {
  const data = await getDaysV1(res.locals.uuid);
  res.json(data);
});

router.post('/days/v1', async (req, res, next) => {
  try {
    const { body: days } = req;
    const data = await createUpdateDaysV1({ uuid: res.locals.uuid, days });
    res.status(201).json(data);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});

router.delete('/days/v1', async (req, res, next) => {
  try {
    const { body: days } = req;
    await destroyDaysV1(res.locals.uuid, days);
    res.sendStatus(204);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});

module.exports = router;
