const { connectDatabase } = require('@kym/db');
const { expect } = require('chai');
const users = include('test-data/users.json');
const mealGoals = include('test-data/meal-goals.json');
const dayMealsCalculation = require('../');

const { User, MealGoals, destroyAll } = connectDatabase();

describe('dayMealsCalculate', () => {
  before(async () => {
    await User.bulkCreate(users);
    await MealGoals.bulkCreate(mealGoals);
  });
  after(async () => {
    await destroyAll();
  });

  it('is okay', async () => {
    const meal = await dayMealsCalculation({ type: 'TRAIN' }, users[0].uuid);
    // eslint-disable-next-line no-unused-expressions
    expect(meal).to.be.ok;
  });
});
