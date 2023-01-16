import { Router } from 'express';
import { handleRouteError } from '../utils';

import addFoodRecordV1 from './controllers/addFoodRecordV1';
import getAllRecordsV1 from './controllers/getAllRecordsV1';
import deleteFoodRecordV1 from './controllers/deleteFoodRecordV1';
import getFoodRecordsByDateV1 from './controllers/getFoodRecordsByDateV1';
import getFoodRecordMicroV1 from './controllers/getFoodRecordMicroV1';
import makeMealPublicV1 from './controllers/makeMealPublicV1';
import updateQuantityV1 from './controllers/updateQuantityV1';
import updateRecordStatusV1 from './controllers/updateRecordStatusV1';

const router = Router();

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
    handleRouteError(err);
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
    handleRouteError(err);
    next(err);
  }
});

module.exports = router;
