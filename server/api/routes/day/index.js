const router = require('express').Router();
const { getDays } = require('./controllers/getDays');
const createUpdateDays = require('./controllers/createUpdateDays');
const destroyDays = require('./controllers/destroyDays');

module.exports = router;

router.get('/days', async function getDayDays(req, res, next) {
  try {
    // const days = await createUpdateDays(res.locals.user_id);
    const days = await getDays(res.locals.user_id);
    res.json(days);
  } catch (err) {
    next(err);
  }
});

router.post('/days', async function postDayDays(req, res, next) {
  try {
    const { days, dayType } = req.body;
    const day = await createUpdateDays(res.locals.user_id, days, dayType);
    res.status(201).json(day);
  } catch (err) {
    next(err);
  }
});

router.delete('/days', async function deleteDayDays(req, res, next) {
  try {
    const deletedDate = await destroyDays(res.locals.user_id, req.body.days);
    res.status(204).send(deletedDate);
  } catch (err) {
    next(err);
  }
});
