const router = require('express').Router();
const addFavoriteFoodV1 = require('./controllers/addFavoriteFoodV1');
const removeFavoriteFoodV1 = require('./controllers/removeFavoriteFoodV1');
const getFavoriteFoodsV1 = require('./controllers/getFavoriteFoodsV1');
const { handleRouteError } = require('../../../utils/handleRouteError');
const { bodySchema: addFavoriteFoodV1BodySchema } = require('./controllers/addFavoriteFoodV1/validation');
const { bodySchema: removeFavoriteFoodV1BodySchema } = require('./controllers/removeFavoriteFoodV1/validation');

module.exports = router;

router.get('/food/v1', async (req, res) => {
  const favorites = await getFavoriteFoodsV1(res.locals.uuid);
  res.json(favorites);
});
router.post('/food/v1', async (req, res, next) => {
  try {
    await addFavoriteFoodV1BodySchema.validate(req.body, { abortEarly: false });
    const { abbrevId, meal } = req.body;
    const data = await addFavoriteFoodV1({ uuid: res.locals.uuid, abbrevId, meal });
    res.json(data);
  } catch (err) {
    handleRouteError(err, err.next);
    next(err);
  }
});
router.delete('/food/v1', async (req, res, next) => {
  try {
    await removeFavoriteFoodV1BodySchema.validate(req.body);

    const { abbrevId, meal } = req.body;
    await removeFavoriteFoodV1({ uuid: res.locals.uuid, abbrevId, meal });
    res.sendStatus(204);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t remove the favorite');
    next(err);
  }
});
