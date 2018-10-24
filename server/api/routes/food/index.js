const router = require('express').Router();
const getFoodByName = require('./controllers/getFoodByName');
const createFood = require('./controllers/createFood');
const autocomplete = require('./controllers/autocomplete');
const addFoodPreference = require('./controllers/addPreference');
const train = require('./controllers/train');
const randomFood = require('./controllers/getRandom');

const PREFERENCES_TRAIN = '/preference/train';
const PREFERENCES_ADD = '/preference/add';
const AUTOCOMPLETE = '/autocomplete/:foodname';
const RANDOM = '/any/random';
const FOOD_NAME = '/:foodname';

router.get(AUTOCOMPLETE, autocomplete);
router.post('/', createFood);

router.put(PREFERENCES_TRAIN, async function trainPreferences(req, res, next) {
  try {

    const { uuid } = res.locals;
    const { food, like } = req.body;

    const randomFood = await train(uuid, food, like);

    if (randomFood) {
      return res.json(randomFood);
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.get(RANDOM, async function getRandomFood(req, res, next) {
  try {
    const random = await randomFood();

    res.json(random);
  } catch (err) {
    next(err);
  }
});



router.get(FOOD_NAME, getFoodByName);



router.post(PREFERENCES_ADD, async function postAddPreferences(req, res, next) {
  try {

    const { uuid } = res.locals;
    const { abbrevId, preference } = req.body;

    const addedPreference = await addFoodPreference(uuid, abbrevId, preference);

    res.json(addedPreference);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
