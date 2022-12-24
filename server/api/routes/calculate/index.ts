import { Router } from 'express';
import { handleRouteError } from '../utils';
import singleMealCalculateV1 from './controllers/singleMealCalculateV1';
import dayMealsCalculateV1 from './controllers/dayMealsCalculateV1';

const router = Router();

module.exports = router;

type ReqQueryType = {
  proteinGoal: string,
  carbGoal: string,
  fatGoal: string,
  id: string[]
};

router.get<'/v1', {}, any, any, ReqQueryType>('/v1', async function getCalculate(req, res, next) {
  try {
    const {
      proteinGoal, carbGoal, fatGoal, id,
    } = req.query;

    const result = await singleMealCalculateV1({
      proteinGoal: parseFloat(proteinGoal),
      carbGoal: parseFloat(carbGoal),
      fatGoal: parseFloat(fatGoal),
      id: id.map(parseFloat),
    });
    res.json(result);
  } catch (err) {
    next(handleRouteError(err));
  }
});

router.post<'/day/v1', {}, any, any, any, { uuid: string }>('/day/v1', async function postCalculateDay(req, res, next) {
  try {
    const meals = await dayMealsCalculateV1(req.body, res.locals.uuid);
    res.json(meals);
  } catch (err) {
    next(handleRouteError(err));
  }
});
