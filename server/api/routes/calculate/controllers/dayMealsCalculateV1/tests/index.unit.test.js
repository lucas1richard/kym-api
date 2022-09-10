const { connectDatabase } = require('@kym/db');
const { expect } = require('chai');
const users = include('test-data/users.json');
const mealGoals = include('test-data/meal-goals.json');
const dayMealsCalculationV1 = require('../');

const { User, MealGoals, destroyAll } = connectDatabase();

describe('dayMealsCalculateV1', () => {
  before(async () => {
    await User.bulkCreate(users);
    await MealGoals.bulkCreate(mealGoals);
  });
  after(async () => {
    await destroyAll();
  });

  it('is okay', async () => {
    const meal = await dayMealsCalculationV1({ type: 'TRAIN' }, users[0].uuid);
    // eslint-disable-next-line no-unused-expressions
    expect(meal).to.be.ok;
  });
});
