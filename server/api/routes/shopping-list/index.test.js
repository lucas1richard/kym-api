const { use } = require('chai');
const { jestSnapshotPlugin } = require('mocha-chai-jest-snapshot');

describe('shopping-list routes', () => {
  use(jestSnapshotPlugin());
  const routePrefix = '/api/shopping-list';

  describe(`GET ${routePrefix}/list/v1`, () => {
    const route = `${routePrefix}/list/v1`;
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('gets a list', async () => {
      await globals.agent.getWithToken(route).expect(200);
    });

    it('gets a list with startDate and numDays', async () => {
      await globals.agent.getWithToken(`${route}?date=2018-07-31&numdays=2`).expect(200);
    });
  });
});
