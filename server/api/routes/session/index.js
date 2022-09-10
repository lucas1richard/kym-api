const router = require('express').Router();
const getUserFromToken = require('./controllers/getUserFromToken');
const signIn = require('./controllers/signIn');
const logger = include('utils/logger');

module.exports = router;

router.post('/', async function postSession(req, res, next) {
  try {
    const {
      email,
      password,
    } = req.body;

    try {
      const token = await signIn(
        email,
        password,
      );

      res.send({ token });
    } catch (error) {
      logger.debug(error);
      res.status(401).send(error);
    }
  } catch (err) {
    logger.debug(err);
    next(err);
  }
});

router.get('/:token', getUserFromToken);
