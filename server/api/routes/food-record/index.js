const { handleRouteError } = include('utils/handleRouteError');
const router = require('express').Router();
const addFoodRecord = require('./controllers/addFoodRecord');
const getAllRecords = require('./controllers/getAllRecords');
const deleteFoodRecord = require('./controllers/deleteFoodRecord');
const getFoodRecordsByDate = require('./controllers/getFoodRecordsByDate');
const getFoodRecordMicro = require('./controllers/getFoodRecordMicro');
const makeMealPublic = require('./controllers/makeMealPublic');
const updateQuantity = require('./controllers/updateQuantity');
const updateRecordStatus = require('./controllers/updateRecordStatus');

router.get('/all/all/all', getAllRecords);
router.post('/', addFoodRecord);

router.delete('/', async function deleteFoodRecordRoute(req, res, next) {
  try {
    const ids = await deleteFoodRecord(req.body, res.locals.uuid);
    res.sendStatus(204); // 204 means "No Content"
  } catch (err) {
    handleRouteError(err, 'Couldn\'t delete the record');
    next(err);
  }
});
router.get('/:date', getFoodRecordsByDate);
router.get('/micro/:date', getFoodRecordMicro);
router.put('/meal', makeMealPublic);
router.put('/quantity', updateQuantity);
router.put('/', updateRecordStatus);

module.exports = router;
