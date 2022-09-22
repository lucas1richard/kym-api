const { expect } = require('chai');

describe('routes/database/getBestGroup', () => {
  before(globals.seedTestData);
  after(globals.destroyAllHook);

  it('returns a group', async () => {
    const res = await globals.agent.getWithToken('/api/database/foodgroup/v1?food[]=chicken');

    expect(res.statusCode).to.equal(200);
  });
});
