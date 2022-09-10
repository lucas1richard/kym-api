const router = require('express').Router();
const getBestGroupV1 = require('./controllers/getBestGroupV1');
const getUserCreatedV1 = require('./controllers/getUserCreatedV1');
const deleteFoodV1 = require('./controllers/deleteFoodV1');
const searchDetailV1 = require('./controllers/searchDetailV1');
const deleteFoodV1BodySchema = require('./controllers/deleteFoodV1/validation');
const { querySchema: getBestGroupV1QuerySchema } = require('./controllers/getBestGroupV1/validation');
const { bodySchema: searchDetailV1BodySchema } = require('./controllers/searchDetailV1/validation');

const { handleRouteError } = include('utils/handleRouteError');

module.exports = router;

// Currently used for creating foods when the user doesn't what foodGroup
// to assign
router.get('/foodgroup/v1', async (req, res, next) => {
  try {
    await getBestGroupV1QuerySchema.validate(req.query);

    const { food } = req.query;

    const group = await getBestGroupV1({ food });

    res.json(group);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});

// A complex search including macronutrient percent
router.post('/search-detail/v1', async (req, res, next) => {
  try {
    await searchDetailV1BodySchema.validate(req.body, { allowUnknown: true });

    const { searchVal, proteinPer, carbsPer, fatPer } = req.body;

    const results = await searchDetailV1({ searchVal, proteinPer, carbsPer, fatPer });

    res.json(results);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});

// Gets foods created by the user
router.get('/user-created/v1', async (req, res, next) => {
  try {
    const { uuid } = res.locals;

    const abbrevs = await getUserCreatedV1({ uuid });

    res.json(abbrevs);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});

// Deletes a food created by the user
router.delete('/user-created/v1', async (req, res, next) => {
  try {
    await deleteFoodV1BodySchema.validate(req.body);

    const { uuid } = res.locals;
    const { id } = req.body;

    await deleteFoodV1({ uuid, id });
    res.sendStatus(204);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});
