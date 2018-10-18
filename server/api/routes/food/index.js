const router = require('express').Router();
const getFoodByName = require('./controllers/getFoodByName');
const createFood = require('./controllers/createFood');
const autocomplete = require('./controllers/autocomplete');

router.get('/:foodname', getFoodByName);
router.get('/autocomplete/:foodname', autocomplete);
router.post('/', createFood);


module.exports = router;
