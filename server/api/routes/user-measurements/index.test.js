const { expect, use } = require('chai');
const { jestSnapshotPlugin } = require('mocha-chai-jest-snapshot');

describe('user-measurements routes', () => {
  use(jestSnapshotPlugin());
  const routePrefix = '/api/user-measurements';

  describe(`GET ${routePrefix}/v1`, () => {
    const route = `${routePrefix}/v1`;
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('gets measurements', async () => {
      const res = await globals.agent.getWithToken(route);
      expect(res.statusCode).equal(200);
    });
  });
});
