import { handleRouteError } from '../utils';
import searchDetailV1 from './controllers/searchDetailV1';
import Router from 'express';
import getBestGroupV1 from './controllers/getBestGroupV1';
import getUserCreatedV1 from './controllers/getUserCreatedV1';
import deleteFoodV1 from './controllers/deleteFoodV1';
import deleteFoodV1BodySchema from './controllers/deleteFoodV1/validation';

const router = Router();

// Currently used for creating foods when the user doesn't what foodGroup
// to assign
router.get<'/foodgroup/v1', any, any, any, { food: string }>(
  '/foodgroup/v1',
  async (req, res, next) => {
    try {
      const { food } = req.query;

      const group = await getBestGroupV1({ food });

      res.json(group);
    } catch (err) {
      handleRouteError(err);
      next(err);
    }
  });

// A complex search including macronutrient percent
router.post<
  '/search-detail/v1',
  {},
  any,
  any,
  { offset: string }
>('/search-detail/v1', async (req, res, next) => {
  try {
    const { searchVal, proteinPer, carbsPer, fatPer } = req.body;
    const { offset } = req.query;

    const results = await searchDetailV1({
      searchVal,
      proteinPer,
      carbsPer,
      fatPer,
      offset: parseInt(offset, 10) || undefined
    });

    res.json(results);
  } catch (err) {
    /* istanbul ignore next */ handleRouteError(err);
    /* istanbul ignore next */ next(err);
  }
});

// Gets foods created by the user
router.get('/user-created/v1', async (req, res, next) => {
  const { uuid } = res.locals;
  const abbrevs = await getUserCreatedV1({ uuid });
  res.json(abbrevs);
});

// Deletes a food created by the user
router.delete('/user-created/v1', async (req, res, next) => {
  try {
    await deleteFoodV1BodySchema.validate(req.body);

    const { uuid } = res.locals;
    const { id } = req.body;

    await deleteFoodV1({ uuid, id });
    res.sendStatus(204);
  } catch (err) {
    handleRouteError(err);
    next(err);
  }
});

module.exports = router;
export default router;
