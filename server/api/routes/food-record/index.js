const { handleRouteError } = include('utils/handleRouteError');
const router = require('express').Router();
const addFoodRecordV1 = require('./controllers/addFoodRecordV1');
const getAllRecordsV1 = require('./controllers/getAllRecordsV1');
const deleteFoodRecordV1 = require('./controllers/deleteFoodRecordV1');
const getFoodRecordsByDateV1 = require('./controllers/getFoodRecordsByDateV1');
const getFoodRecordMicroV1 = require('./controllers/getFoodRecordMicroV1');
const makeMealPublicV1 = require('./controllers/makeMealPublicV1');
const updateQuantityV1 = require('./controllers/updateQuantityV1');
const updateRecordStatusV1 = require('./controllers/updateRecordStatusV1');

router.get('/all/all/all/v1', async (req, res, next) => {
  const records = await getAllRecordsV1();
  res.json(records);
});

router.post('/v1', async (req, res, next) => {
  try {
    const { uuid } = res.locals;
    const foods = await addFoodRecordV1({ uuid, data: req.body });
    res.status(201).json(foods);
  } catch (err) {
    handleRouteError(err);
    next(err);
  }
});

router.delete('/v1', async function deleteFoodRecordRoute(req, res, next) {
  try {
    const { ids } = req.body;
    const { uuid } = res.locals;
    await deleteFoodRecordV1({ ids, uuid });
    res.sendStatus(204);
  } catch (err) {
    handleRouteError(err);
    next(err);
  }
});

router.get('/:date/v1', async (req, res, next) => {
  try {
    const { date } = req.params;
    const { uuid } = res.locals;
    const records = await getFoodRecordsByDateV1({ date, uuid });
    res.json(records);
  } catch (err) {
    handleRouteError(err);
    next(err);
  }
});

router.get('/micro/:date/v1', async (req, res, next) => {
  try {
    const { date } = req.params;
    const { uuid } = res.locals;
    const records = await getFoodRecordMicroV1({ uuid, date });
    res.json(records);
  } catch (err) {
    handleRouteError(err);
    next(err);
  }
});

router.put('/meal/v1', async (req, res, next) => {
  try {
    const { mealId } = req.body;
    const { uuid } = res.locals;
    const meal = await makeMealPublicV1({ mealId, uuid });
    res.json(meal);
  } catch (err) {
    handleRouteError(err);
    next(err);
  }
});

router.put('/quantity/v1', async (req, res, next) => {
  try {
    const data = req.body;
    const { uuid } = res.locals;
    const newRecord = await updateQuantityV1({ data, uuid });
    res.json(newRecord);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t update the record');
    next(err);
  }
});
router.put('/v1', async (req, res, next) => {
  try {
    const { ids, confirmed } = req.body;
    const { uuid } = res.locals;
    await updateRecordStatusV1({ ids, confirmed, uuid });
    res.sendStatus(204);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t update the record status');
    next(err);
  }
});

module.exports = router;
