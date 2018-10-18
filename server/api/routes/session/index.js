const router = require('express').Router();
const getUserFromToken = require('./controllers/getUserFromToken');
const signIn = require('./controllers/signIn');

module.exports = router;

router.use(function sessionMiddleware(req, res, next) {
  res.locals = {
    jwtSecret: process.env.SECRET || '1701-Flex-NY'
  };
  next();
});

router.post('/', async function postSession(req, res, next) {
  try {
    const {
      username,
      password
    } = req.body;

    try {
      const token = await signIn(
        username,
        password,
        res.locals.jwtSecret
      );

      console.log({ token, username, password });

      res.send({ token });
    } catch (error) {
      console.log(error);
      res.status(401).send(error);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get('/:token', getUserFromToken);
