const router = require('express').Router();
const getMealV1 = require('./controllers/getMealV1');

module.exports = router;

router.get('/v1', async (req, res, next) => {
  const { postWorkout, keyword, excludeOwnMeals } = req.query;
  const { uuid } = res.locals;

  const meals = await getMealV1({ postWorkout, keyword, uuid, excludeOwnMeals });

  res.json(meals);
});
