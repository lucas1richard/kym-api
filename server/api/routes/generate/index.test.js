const { expect, use } = require('chai');
const { jestSnapshotPlugin } = require('mocha-chai-jest-snapshot');

describe('generate routes', () => {
  use(jestSnapshotPlugin());
  const routePrefix = '/api/generate';

  describe(`GET ${routePrefix}/v1`, () => {
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('gets a random food', async () => {
      const res = await globals.agent.getWithToken(`${routePrefix}/v1`);
      expect(res.statusCode).equals(200);
      expect(Number.isInteger(res.body.id)).to.be.true;
    });
  });
  describe(`GET ${routePrefix}/calculate/v1`, () => {
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('calculates for goals', async () => {
      const goals = 'proteinGoal=20&carbGoal=30&fatGoal=10';
      const res = await globals.agent.getWithToken(`${routePrefix}/calculate/v1?${goals}`);
      expect(res.statusCode).equals(200);
      expect(Array.isArray(res.body)).to.be.true;
      res.body.forEach((item) => {
        expect(Array.isArray(item.foods)).to.be.true;
        expect(item.weight).to.be.ok;
        expect(item.macros).to.be.ok;
      });
    });

    it('validates goals', async () => {
      const goals = '';
      const res = await globals.agent.getWithToken(`${routePrefix}/calculate/v1?${goals}`);
      expect(res.statusCode).equals(400);
      expect(res.body).toMatchSnapshot();
    });
  });
});
