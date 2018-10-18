const router = require('express').Router();
const getMeal = require('./controllers/getMeal');

module.exports = router;

router.get('/', getMeal);
