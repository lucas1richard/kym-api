const { Abbrev, FoodDesc, FoodGroup } = include('db');
const abbrevs = include('test-data/abbrev');
const foodDes = include('test-data/food-des');
const foodGrp = include('test-data/fd-group');
const sinon = require('sinon');
const getBestGroup = require('../');
const { expect } = require('chai');

describe('routes/database/getBestGroup', () => {
  let next;
  let res;
  // let req;
  beforeEach(() => {
    next = sinon.spy();
    // req = {
    //   query: { food: ['chicken'] }
    // };
    res = {
      locals: { user_id: 1 },
      json: sinon.spy()
    };
  });
  before(async () => {
    await Abbrev.bulkCreate(abbrevs);
    await FoodGroup.bulkCreate(foodGrp);
    await FoodDesc.bulkCreate(foodDes);
  });
  after(async () => {
    await Abbrev.destroy({ where: {}, force: true });
    await FoodDesc.destroy({ where: {}, force: true });
    await FoodGroup.destroy({ where: {}, force: true });
  });
  it('catches an error', async () => {
    delete res.locals.user_id;
    await getBestGroup({}, res, next);
    expect(next.called).equal(true);
  });
});

