const { expect, use } = require('chai');
const { jestSnapshotPlugin } = require('mocha-chai-jest-snapshot');

describe('goals routes', () => {
  use(jestSnapshotPlugin());
  const routePrefix = '/api/goals';

  describe(`GET ${routePrefix}/meals/v1`, () => {
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('creates goals and responds with the new goals', async () => {
      const goal = { protein: 20, carbs: 30, fat: 10 };
      const res = await globals.agent.postWithToken(`${routePrefix}/meals/v1`)
        .send({
          TRAIN: [goal, goal, goal, goal, goal, goal],
          REST: [goal, goal, goal, goal, goal, goal],
        });
      expect(res.statusCode).equal(201);
      expect(res.body).toMatchSnapshot();
    });
    it('validates the req', async () => {
      const goal = { carbs: 30, fat: 10 };
      const res = await globals.agent.postWithToken(`${routePrefix}/meals/v1`)
        .send({
          TRAIN: [goal, goal, goal, goal, goal, goal],
          REST: [goal, goal, goal, goal, goal, goal],
        });
      expect(res.statusCode).equal(400);
      expect(res.body).toMatchSnapshot();
    });
  });
});
