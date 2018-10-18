const { handleRouteError } = include('utils/handleRouteError');
const router = require('express').Router();
const singleMealCalculate = require('./controllers/singleMealCalculate');
const dayMealsCalculate = require('./controllers/dayMealsCalculate');

module.exports = router;

router.get('/', async function getCalculate(req, res, next) {
  try {
    const meal = await singleMealCalculate(req.query);
    res.json(meal);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t calculate the meal');
    next(err);
  }
});


router.post('/day', async function postCalculateDay(req, res, next) {
  try {
    const meals = await dayMealsCalculate(req.body, res.locals.user_id);
    res.json(meals);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t get the day meals');
    next(err);
  }
});
