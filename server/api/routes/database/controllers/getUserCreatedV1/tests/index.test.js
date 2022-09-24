const { expect } = require('chai');

describe('routes/database/getUserCreated', () => {
  before(globals.seedTestData);
  after(globals.destroyAllHook);

  it('returns an array', async () => {
    const res = await globals.agent.getWithToken('/api/database/user-created/v1');

    expect(Array.isArray(res.body)).to.be.true;
  });
});
