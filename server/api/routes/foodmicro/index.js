const router = require('express').Router();
const { handleRouteError } = include('utils/handleRouteError');
const getFoodMicro = require('./controllers/getFoodMicro');

router.get('/:id/v1', async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = await getFoodMicro({ id });
    res.json(record);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});

module.exports = router;
