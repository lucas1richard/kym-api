const { handleRouteError } = include('utils/handleRouteError');
const router = require('express').Router();
const singleMealCalculateV1 = require('./controllers/singleMealCalculateV1');
const dayMealsCalculateV1 = require('./controllers/dayMealsCalculateV1');
const { bodySchema } = require('./controllers/dayMealsCalculateV1/validation');

module.exports = router;

router.get('/v1', async function getCalculate(req, res, next) {
  try {
    const result = await singleMealCalculateV1(req.query);
    res.json(result);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});

router.post('/day/v1', async function postCalculateDay(req, res, next) {
  try {
    await bodySchema.validate(req.body, { allowUnknown: true, abortEarly: false });
    const meals = await dayMealsCalculateV1(req.body, res.locals.uuid);
    res.json(meals);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});
