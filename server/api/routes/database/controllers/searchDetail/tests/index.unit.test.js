const { connectDatabase } = require('@kym/db');
const { Abbrev, FoodDesc, FoodGroup } = connectDatabase();
const abbrevs = include('test-data/abbrev.json');
const foodDes = include('test-data/food-des.json');
const foodGrp = include('test-data/fd-group.json');
const sinon = require('sinon');
const searchDetail = require('../');
const { expect } = require('chai');

describe('routes/database/searchDetail', () => {
  let next;
  let res;
  let req;
  beforeEach(() => {
    next = sinon.spy();
    req = {
      body: {
        searchVal: 'chicken',
      },
    };
    res = {
      locals: { user_id: 1 },
      json: sinon.spy(),
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
    await searchDetail({}, res, next);
    expect(next.called).equal(true);
  });
  it('returns records', async () => {
    await searchDetail(req, res, next);
    expect(res.json.called).equal(true);
  });
  it('returns records', async () => {
    delete req.body.searchVal;
    await searchDetail(req, res, next);
    expect(res.json.called).equal(true);
  });
});
