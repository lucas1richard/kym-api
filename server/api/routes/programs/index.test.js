const { expect, use } = require('chai');
const { jestSnapshotPlugin } = require('mocha-chai-jest-snapshot');

describe('programs routes', () => {
  use(jestSnapshotPlugin());
  const routePrefix = '/api/programs';

  describe(`GET ${routePrefix}/v1`, () => {
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('gets all programs for the user', async () => {
      const res = await globals.agent.getWithToken(`${routePrefix}/v1`);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe(`GET ${routePrefix}/single-program/v1`, () => {
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('gets a single program for the user', async () => {
      const res = await globals.agent.getWithToken(`${routePrefix}/single-program/v1`);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe(`POST ${routePrefix}/v1`, () => {
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('creates a program for the user', async () => {
      const res = await globals.agent.postWithToken(`${routePrefix}/v1`)
        .send({ units: 'IMPERIAL', weight: 175, goal: 'GAIN_MUSCLE' });

      expect(res.statusCode).equal(201);
      expect(res.body.id).to.be.ok;
    });

    it('validates the req', async () => {
      const res = await globals.agent.postWithToken(`${routePrefix}/v1`)
        .send({});

      expect(res.statusCode).equal(400);
      expect(res.body).toMatchSnapshot();
    });
  });
});
