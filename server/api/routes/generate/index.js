const router = require('express').Router();
const getRandomFood = require('./controllers/getRandomFood');
const calculateFoodQuantities = require('./controllers/calculateFoodQuantities');

router.get('/', getRandomFood);
router.get('/calculate', calculateFoodQuantities);


module.exports = router;
