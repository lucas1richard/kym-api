const { connectDatabase } = require('@kym/db');
const {
  User,
  FoodRecord,
  Meal,
  Abbrev,
  Weight
} = connectDatabase();
const abbrevs = include('test-data/abbrev');
const users = include('test-data/users');
const weight = include('test-data/weight');
const meals = include('test-data/meals');
const foodRecord = include('test-data/food-record');
const sinon = require('sinon');
const updateQuantity = require('../');
const { expect } = require('chai');

describe('routes/database/updateQuantity', () => {
  let next;
  let res;
  let req;
  before(async () => {
    await User.bulkCreate(users);
    await Meal.bulkCreate(meals);
    await Abbrev.bulkCreate(abbrevs);
    await FoodRecord.bulkCreate(foodRecord);
    await Weight.bulkCreate(weight);
  });
  after(async () => {
    await Weight.destroy({ where: {}, force: true });
    await FoodRecord.destroy({ where: {}, force: true });
    await Meal.destroy({ where: {}, force: true });
    await Abbrev.destroy({ where: {}, force: true });
    await User.destroy({ where: {}, force: true });
  });
  beforeEach(() => {
    next = sinon.spy();
    req = {
      body: {
        id: 1,
        seq: 1,
        quantity: 1
      }
    };
    res = {
      locals: { user_id: 1 },
      json: sinon.spy()
    };
  });


  it('catches an error', async () => {
    delete res.locals.user_id;
    await updateQuantity({}, res, next);
    expect(next.called).equal(true);
  });

  // it('returns 404 if the user isn\'t found', async () => {
  //   res.locals.user_id = 100000;
  //   await updateQuantity({}, res, next);
  //   expect(next.called).equal(true);
  //   expect(next.firstCall.args[0].commonType).equal(404);
  // });

  it('validates the request body', async () => {
    delete req.body.seq;
    await updateQuantity(req, res, next);
    expect(next.called).equal(true);
    expect(next.firstCall.args[0].isJoi).equal(true);
  });

  it('updates the quantity', async () => {
    await updateQuantity(req, res, next);
    expect(res.json.called).equal(true);
  });
});

