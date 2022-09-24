const { connectDatabase } = require('@kym/db');
const { expect } = require('chai');

const { FoodGroup, User } = connectDatabase();

describe('food-groups api (GET food-groups)', () => {
  before(async () => {
    await User.bulkCreate(globals.testData.users);
    await FoodGroup.bulkCreate(globals.testData.foodGroups);
  });
  after(globals.destroyAllHook);
  it('should get a list of groups', async () => {
    const res = await globals.agent.getWithToken('/api/food-groups/v1');
    expect(res.statusCode).equal(200);
  });
});
