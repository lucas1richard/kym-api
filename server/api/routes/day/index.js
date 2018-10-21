// const chalk = require('chalk');
const Controller = include('utils/Controller');
const router = require('express').Router();
const { getDays } = require('./controllers/getDays');
const createUpdateDays = require('./controllers/createUpdateDays');
const destroyDays = require('./controllers/destroyDays');

module.exports = router;

const controller = new Controller;

router.get('/days', async function getDayDays(req, res, next) {
  await controller.tryFunction(
    getDays(controller.getUserId(res)),
    (data) => res.json(data),
    (err) => next(err)
  );
});

router.post('/days', async function postDayDays(req, res, next) {
  const { days, dayType } = req.body;
  await controller.tryFunction(
    createUpdateDays(controller.getUserId(res), days, dayType),
    (data) => res.status(201).json(data),
    (err) => next(err)
  );
});

router.delete('/days', async function deleteDayDays(req, res, next) {
  await controller.tryFunction(
    destroyDays(controller.getUserId(res), req.body.days),
    (data) => res.status(204).send(data),
    (err) => next(err)
  );
});
