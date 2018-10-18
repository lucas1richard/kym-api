const router = require('express').Router();
const getCalories = require('./controllers/getCalories');

module.exports = router;

router.get('/calories', getCalories);
