import { Router } from 'express';
import addFavoriteFoodV1 from './controllers/addFavoriteFoodV1';
import removeFavoriteFoodV1 from './controllers/removeFavoriteFoodV1';
import getFavoriteFoodsV1 from './controllers/getFavoriteFoodsV1';
const { handleRouteError } = require('../../../utils/handleRouteError');

const router = Router();

router.get('/food/v1', async (req, res) => {
  const favorites = await getFavoriteFoodsV1(res.locals.uuid);
  res.json(favorites);
});
router.post('/food/v1', async (req, res, next) => {
  try {
    const { abbrevId, meal } = req.body;
    const data = await addFavoriteFoodV1({ uuid: res.locals.uuid, abbrevId, meal });
    res.json(data);
  } catch (err) {
    next(handleRouteError(err));
  }
});
router.delete('/food/v1', async (req, res, next) => {
  try {
    const { abbrevId, meal } = req.body;
    await removeFavoriteFoodV1({ uuid: res.locals.uuid, abbrevId, meal });
    res.sendStatus(204);
  } catch (err) {
    next(handleRouteError(err));
  }
});

module.exports = router;
