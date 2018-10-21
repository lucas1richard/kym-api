const { FoodRecord, User, Abbrev, Weight } = include('db');
const users = include('test-data/users');
const abbrevs = include('test-data/abbrev');
const weights = include('test-data/weight');
const { expect } = require('chai');
const createWithMealUnbound = require('../createWithMeal');

const createWithMeal = createWithMealUnbound.bind(FoodRecord);

describe('db/models/food-record/classMethods', () => {
  describe('createWithMeal', () => {
    beforeEach(async () => {
      await User.bulkCreate(users);
      await Abbrev.bulkCreate(abbrevs);
      await Weight.bulkCreate(weights);
    });
    afterEach(async () => {
      await FoodRecord.destroy({ where: {}, force: true });
      await Weight.destroy({ where: {}, force: true });
      await Abbrev.destroy({ where: {}, force: true });
      await User.destroy({ where: {}, force: true });
    });
    it('adds a foodrecord with a meal', async () => {
      const abbrev_id = 2514;
      const date = new Date('2018-01-01');
      const meal = 3;
      const quantity = 1;
      const unit = 1;
      const user_id = 1;
      const confirmed = false;
      try {
        const record = await createWithMeal({ abbrev_id, date, meal, quantity, unit, user_id, confirmed });
        expect(record).to.be.ok; // eslint-disable-line
      } catch (error) {
        // console.log(error);
      }
    });
  });
});

