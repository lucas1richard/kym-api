const router = require('express').Router();
const getFoodByName = require('./controllers/getFoodByNameV1');
const createFood = require('./controllers/createFoodV1');
const autocomplete = require('./controllers/autocompleteV1');
// const addFoodPreference = require('./controllers/addPreferenceV1');
// const train = require('./controllers/trainV1');
const randomFood = require('./controllers/getRandomV1');
const { handleRouteError } = require('../../../utils/handleRouteError');
const { foodnameSchema, offsetSchema } = require('./controllers/getFoodByNameV1/validation');
const { bodySchema } = require('./controllers/createFoodV1/validation');
const AppError = require('../../../configure/appError');

router.get('/autocomplete/:foodname/v1', async (req, res, next) => {
  try {
    const { foodname } = req.params;
    const query = foodname.trim();

    if (query.length <= 3) throw new AppError(400, { devmessage: 'FOODNAME_LENGTH_ERROR' });
    const foods = await autocomplete({ foodname: query });
    res.json(foods);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});

router.post('/v1', async (req, res, next) => {
  try {
    await bodySchema.validate(req.body, { abortEarly: false });
    const newAbbrev = await createFood({ data: req.body, uuid: res.locals.uuid });
    res.status(201).json({ abbrevId: newAbbrev.id });
  } catch (err) {
    handleRouteError(err, 'Couldn\'t create the food');
    next(err);
  }
});

/* istanbul ignore next */
// router.put('/preference/train/v1', async function trainPreferences(req, res, next) {
//   try {
//     const { uuid } = res.locals;
//     const { food, like } = req.body;

//     const randomFood = await train(uuid, food, like);

//     if (randomFood) res.json(randomFood);

//     res.sendStatus(204);
//   } catch (err) {
//     next(err);
//   }
// });

router.get('/any/random/v1', async function getRandomFood(req, res, next) {
  const random = await randomFood();
  res.json(random);
});

router.get('/:foodname/v1', async (req, res, next) => {
  try {
    const offset = parseInt(req.query.offset, 10) || 0;
    const { foodname } = req.params;
    const query = foodname.trim();
    if (query.length <= 3) throw new AppError(400, { devmessage: 'FOODNAME_LENGTH_ERROR' });

    await foodnameSchema.validate(query);
    await offsetSchema.validate(offset);

    const data = await getFoodByName({ foodname: query, offset });
    res.json(data);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});

/* istanbul ignore next */
// router.post('/preference/add/v1', async function postAddPreferences(req, res, next) {
//   try {
//     const { uuid } = res.locals;
//     const { abbrevId, preference } = req.body;

//     const addedPreference = await addFoodPreference(uuid, abbrevId, preference);

//     res.json(addedPreference);
//   } catch (err) {
//     handleRouteError(err, err.message);
//     next(err);
//   }
// });

module.exports = router;
