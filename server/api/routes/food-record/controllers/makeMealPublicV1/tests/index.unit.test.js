const makeMealPublic = require('../');
const { expect } = require('chai');

describe('routes/food-record/makeMealPublic', () => {
  before(globals.seedTestData);
  after(globals.destroyAllHook);

  const userUuid = globals.testData.users[0].uuid;

  it('catches an error', async () => {
    try {
      await makeMealPublic({});
    } catch (err) {
      expect(err.isJoi).to.be.true;
    }
  });

  it('makes the meal public', async () => {
    const meal = await makeMealPublic({ mealId: 1, uuid: userUuid });
    expect(meal.public).to.be.true;
  });
});
