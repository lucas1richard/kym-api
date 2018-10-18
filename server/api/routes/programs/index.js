const router = require('express').Router();
const getProgram = require('./controllers/getProgram');
const getPrograms = require('./controllers/getPrograms');
const createProgram = require('./controllers/createProgram');

module.exports = router;

router.get('/single-program', getProgram);
router.get('/', getPrograms);
router.post('/', createProgram);
