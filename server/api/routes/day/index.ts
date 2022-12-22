import { Router } from 'express';
import getDaysV1 from './controllers/getDaysv1';
import createUpdateDaysV1 from './controllers/createUpdateDaysv1';
import destroyDaysV1 from './controllers/destroyDaysv1';
import { handleRouteError } from '../utils';

const router = Router();

router.get('/days/v1', async (req, res) => {
  const data = await getDaysV1(res.locals.uuid);
  res.json(data);
});

router.post('/days/v1', async (req, res, next) => {
  try {
    const { body: days } = req;
    const data = await createUpdateDaysV1({ uuid: res.locals.uuid, days });
    res.status(201).json(data);
  } catch (err) {
    next(handleRouteError(err))
  }
});

router.delete('/days/v1', async (req, res, next) => {
  try {
    const { body: days } = req;
    await destroyDaysV1(res.locals.uuid, days);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    next(handleRouteError(err))
  }
});

module.exports = router;
