const router = require('express').Router();
const getMealGoalsController = require('./controllers/getMealGoals');
const createMealGoals = require('./controllers/createMealGoals');

module.exports = router;

router.get('/', async function getMealGoalsRoute(req, res, next) {
  try {
    const mealGoals = await getMealGoalsController(res.locals.user_id);
    res.json(mealGoals);
  } catch (err) {
    next(err);
  }
});

router.post('/', createMealGoals);
