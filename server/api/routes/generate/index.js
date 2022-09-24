const router = require('express').Router();
const { handleRouteError } = include('utils/handleRouteError');
const getRandomFoodV1 = require('./controllers/getRandomFoodV1');
const calculateFoodQuantitiesV1 = require('./controllers/calculateFoodQuantitiesV1');

router.get('/v1', async (req, res, next) => {
  const result = await getRandomFoodV1();
  res.json(result);
});

router.get('/calculate/v1', async (req, res, next) => {
  try {
    const { proteinGoal, carbGoal, fatGoal } = req.query;
    const data = await calculateFoodQuantitiesV1({ goals: { proteinGoal, carbGoal, fatGoal } });
    res.json(data);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});

module.exports = router;
