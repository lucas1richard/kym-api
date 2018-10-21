const { handleRouteError } = include('utils/handleRouteError');
const router = require('express').Router();
const getUser = require('./controllers/getUser');
const signup = require('./controllers/signup');
const createMeasurements = require('./controllers/createMeasurements');
const updateMeasurements = require('./controllers/updateMeasurements');
const deleteMeasurements = require('./controllers/deleteMeasurements');
const updateUser = require('./controllers/updateUser');

module.exports = router;

router.get('/', getUser);
router.put('/', async function putUser(req, res, next) {
  try {
    const updatedUser = await updateUser(req.body, res.locals.uuid);
    res.json(updatedUser);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t update your information');
    next(err);
  }
});
router.post('/signup', signup);

async function postUserMeasurements(req, res, next) {
  try {
    const measurements = await createMeasurements(
      req.body,
      res.locals.uuid
    );
    res.json(measurements);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t create measurements');
    next(err);
  }
}

router.post('/measurements', postUserMeasurements);

router.put('/measurements', async function putUserMeasurements(req, res, next) {
  try {
    const measurements = await updateMeasurements(req.body, res.locals.uuid);
    res.json(measurements);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t update measurements');
    next(err);
  }
});

router.delete('/measurements', deleteMeasurements);

// db.User.requestFoodLog(3, '2017-10-04')
//   .then(({data}) => console.log(data));

