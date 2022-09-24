const router = require('express').Router();
const { handleRouteError } = include('utils/handleRouteError');
const getProgramV1 = require('./controllers/getProgramV1');
const createProgramV1 = require('./controllers/createProgramV1');

module.exports = router;

router.get('/single-program/v1', async (req, res, next) => {
  const { uuid } = res.locals;
  const programs = await getProgramV1({ uuid });
  res.json(programs);
});

router.get('/v1', async (req, res, next) => {
  const { uuid } = res.locals;
  const programs = await getProgramV1({ uuid, getAll: true });
  res.json(programs);
});

router.post('/v1', async (req, res, next) => {
  try {
    const data = req.body;
    const { uuid } = res.locals;
    const newProgram = await createProgramV1({ data, uuid });
    res.status(201).json(newProgram);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});
