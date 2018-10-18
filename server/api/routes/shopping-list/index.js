const router = require('express').Router();
const getList = require('./controllers/getList');

module.exports = router;

router.get('/list', getList);
