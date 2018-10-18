const router = require('express').Router();
const getFoodMicro = require('./controllers/getFoodMicro');

router.get('/:id', getFoodMicro);

module.exports = router;
