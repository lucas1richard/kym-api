const { connectDatabase } = require('@kym/db');
const { expect } = require('chai');
const singleMealCalculation = require('../');
const { errorMessages } = require('../validation');

const { Abbrev, destroyAll } = connectDatabase();

describe('singleMealCalculate', () => {
  before(async () => {
    await Abbrev.bulkCreate(testData.abbrevs);
  });
  after(async () => {
    await destroyAll();
  });

  it('is okay', async () => {
    const { result, error } = await singleMealCalculation({
      proteinGoal: 20,
      carbGoal: 30,
      fatGoal: 10,
      id: [1, 2, 3],
    });
    // eslint-disable-next-line no-unused-expressions
    expect(result).to.be.ok;
    expect(error).to.eql(undefined);
  });
  it('throw if query validation fails', async () => {
    try {
      await singleMealCalculation({
        // proteinGoal: 20,
        // carbGoal: 30,
        fatGoal: 10,
        id: [1, 2, 3],
      });
    } catch (err) {
      expect(err.details[0].message).to.eql(errorMessages.INVALID_GOAL_PROTEIN);
      expect(err.details[1].message).to.eql(errorMessages.INVALID_GOAL_CARBOHYDRATES);
    }
  });
});
