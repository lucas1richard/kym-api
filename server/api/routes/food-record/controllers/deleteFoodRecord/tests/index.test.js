const { FoodRecord, Meal, Abbrev, User } = include('db');
const records = include('test-data/food-record');
const meals = include('test-data/meals');
const users = include('test-data/users');
const abbrevs = include('test-data/abbrev');
const deleteFoodRecord = require('../index');
const { expect } = require('chai');

describe('/routes/food-record/controllers/deleteFoodRecord', () => {
  beforeEach(async () => {
    await User.bulkCreate(users);
    await Abbrev.bulkCreate(abbrevs);
    await Meal.bulkCreate(meals);
    await FoodRecord.bulkCreate(records);
  });
  it('deletes a food', async () => {
    const body = {
      ids: ['1']
    };
    await deleteFoodRecord(body);
  });
  it('fails with malformed data', async () => {
    try {
      const body = {
        id: 100
      };
      await deleteFoodRecord(body);
    } catch (err) {
      expect(err.isJoi).to.equal(true);
    }
  });
  it('fails with malformed data - 1', async () => {
    try {
      const body = {};
      await deleteFoodRecord(body);
    } catch (err) {
      expect(!!err.isJoi).to.equal(false);
    }
  });
  afterEach(async () => {
    await FoodRecord.destroy({ where: {}, force: true });
    await Abbrev.destroy({ where: {}, force: true });
    await User.destroy({ where: {}, force: true });
    await Meal.destroy({ where: {}, force: true });
  });
});
