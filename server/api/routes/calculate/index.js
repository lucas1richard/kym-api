const { handleRouteError } = include('utils/handleRouteError');
const router = require('express').Router();
const singleMealCalculate = require('./controllers/singleMealCalculate');
const dayMealsCalculate = require('./controllers/dayMealsCalculate');

module.exports = router;

router.get('/', async function getCalculate(req, res, next) {
  try {
    const result = await singleMealCalculate(req.query);
    res.json(result);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});

router.post('/day', async function postCalculateDay(req, res, next) {
  try {
    const meals = await dayMealsCalculate(req.body, res.locals.uuid);
    res.json(meals);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});
