const { expect, use } = require('chai');
const { jestSnapshotPlugin } = require('mocha-chai-jest-snapshot');

describe('database routes', () => {
  use(jestSnapshotPlugin());
  const routePrefix = '/api/database';

  describe(`GET ${routePrefix}/foodgroup/v1`, () => {
    const route = `${routePrefix}/foodgroup/v1`;
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('gets the best group', async () => {
      const res = await globals.agent.getWithToken(`${route}?food[]=chicken`);
      expect(res.statusCode).equal(200);
    });

    it('validates the req', async () => {
      const res = await globals.agent.getWithToken(`${route}?food=chicken`);
      expect(res.statusCode).equal(400);
    });
  });

  describe(`POST ${routePrefix}/search-detail/v1`, () => {
    const route = `${routePrefix}/search-detail/v1`;
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('gets the best group', async () => {
      const res = await globals.agent.postWithToken(route)
        .send({ proteinPer: '30', carbsPer: '40', fatPer: '30' });
      expect(res.statusCode).equal(200);
    });
  });
});
