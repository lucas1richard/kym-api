const router = require('express').Router();
const { handleRouteError } = include('utils/handleRouteError');
const createGoalsV1 = require('./controllers/createGoalsV1');

module.exports = router;

router.post('/meals/v1', async (req, res, next) => {
  try {
    const { uuid } = res.locals;
    const goals = req.body;
    const newGoals = await createGoalsV1({ uuid, goals });
    res.status(201).json(newGoals);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});
