const router = require('express').Router();
const { handleRouteError } = include('utils/handleRouteError');
const getFoodMicroV1 = require('./controllers/getFoodMicroV1');

router.get('/:id/v1', async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = await getFoodMicroV1({ id });
    res.json(record);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});

module.exports = router;
