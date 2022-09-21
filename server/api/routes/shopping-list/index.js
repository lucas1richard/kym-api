const router = require('express').Router();
const getListV1 = require('./controllers/getListV1');

module.exports = router;

router.get('/list/v1', async (req, res, next) => {
  const { date, numdays } = req.query;
  const { uuid } = res.locals;
  const records = await getListV1({ date, numDays: numdays, uuid });
  res.json(records);
});
