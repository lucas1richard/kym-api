const { expect, use } = require('chai');
const { jestSnapshotPlugin } = require('mocha-chai-jest-snapshot');

describe('foodmicro routes', () => {
  use(jestSnapshotPlugin());
  const routePrefix = '/api/foodmicro';

  describe(`GET ${routePrefix}/:id/v1`, () => {
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('gets food with micronutrient data', async () => {
      const res = await globals.agent.getWithToken(`${routePrefix}/2514/v1`);
      expect(res.statusCode).equal(200);
      expect(res.body).toMatchSnapshot();
    });

    it('validates the :id param', async () => {
      const res = await globals.agent.getWithToken(`${routePrefix}/xyz/v1`);
      expect(res.statusCode).equal(400);
      expect(res.body).toMatchSnapshot();
    });
  });
});
