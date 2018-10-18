const router = require('express').Router();
const createGoals = require('./controllers/createGoals');

module.exports = router;

router.post('/meals', createGoals);
