const { expect, use } = require('chai');
const { jestSnapshotPlugin } = require('mocha-chai-jest-snapshot');

describe('meal routes', () => {
  use(jestSnapshotPlugin());
  const routePrefix = '/api/meal';

  describe(`GET ${routePrefix}/v1`, () => {
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('gets public meals without keyword', async () => {
      const res = await globals.agent.getWithToken(`${routePrefix}/v1`);
      expect(res.statusCode).equal(200);
      expect(res.body).toMatchSnapshot();
    });

    it('gets public meals with keyword', async () => {
      const res = await globals.agent.getWithToken(`${routePrefix}/v1?keyword=chi`);
      expect(res.statusCode).equal(200);
      expect(res.body).toMatchSnapshot();
    });
  });
});
