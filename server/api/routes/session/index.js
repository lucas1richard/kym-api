const router = require('express').Router();
const { handleRouteError } = include('utils/handleRouteError');
const getUserFromTokenV1 = require('./controllers/getUserFromTokenV1');
const signInV1 = require('./controllers/signInV1');
const signupV1 = require('./controllers/signupV1');
const signupV2 = require('./controllers/signupV2');
const logger = include('utils/logger');

module.exports = router;

router.post('/signin/v1', async function postSession(req, res, next) {
  try {
    const { email, password } = req.body;
    const token = await signInV1({ email, password });
    res.send({ token });
  } catch (error) {
    logger.debug(error);
    res.status(401).send(error);
  }
});

router.get('/token/v1', async (req, res, next) => {
  try {
    const { token } = req.headers;
    const { jwtSecret } = res.locals;
    const user = await getUserFromTokenV1({ token, jwtSecret });
    res.json(user);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});

router.post('/signup/v1', async (req, res, next) => {
  try {
    const { jwtSecret } = res.locals;
    const data = req.body;
    const { user, token } = await signupV1({ data, jwtSecret });
    res.status(201).set('token', token).json(user);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});

router.post('/signup/v2', async (req, res, next) => {
  try {
    const { jwtSecret } = res.locals;
    const data = req.body;
    const { user, token } = await signupV2({ data, jwtSecret });
    res.status(201).set('token', token).json(user);
  } catch (err) {
    handleRouteError(err, err.message);
    next(err);
  }
});
