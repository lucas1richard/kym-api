const { expect, use } = require('chai');
const { jestSnapshotPlugin } = require('mocha-chai-jest-snapshot');

describe('food-record routes', () => {
  use(jestSnapshotPlugin());
  const routePrefix = '/api/food-record';

  describe(`GET ${routePrefix}/all/all/all/v1`, () => {
    before(async () => {
      await globals.destroyAllHook();
      await globals.seedTestData();
    });
    after(globals.destroyAllHook);

    it('gets all records', async () => {
      const res = await globals.agent.getWithToken(`${routePrefix}/all/all/all/v1`);
      expect(res.statusCode).equal(200);
      expect(Array.isArray(res.body)).to.be.true;
    });
  });

  describe(`POST ${routePrefix}/v1`, () => {
    before(async () => {
      await globals.seedTestData();
    });
    after(globals.destroyAllHook);

    it('creates a record', async () => {
      const res = await globals.agent.postWithToken(`${routePrefix}/v1`)
        .send([{
          abbrevId: 2514,
          date: '2022-09-15',
          meal: 3,
          quantity: 1,
          unit: 1,
          confirmed: true,
        }]);
      expect(res.statusCode).equal(201);
      expect(res.body).toMatchSnapshot();
    });
    it('validates the req body', async () => {
      const res = await globals.agent.postWithToken(`${routePrefix}/v1`)
        .send([{}]);
      expect(res.statusCode).equal(400);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe(`DELETE ${routePrefix}/v1`, () => {
    before(async () => {
      await globals.destroyAllHook();
      await globals.seedTestData();
    });
    after(globals.destroyAllHook);

    it('deletes a record', async () => {
      const res = await globals.agent.deleteWithToken(`${routePrefix}/v1`)
        .send({
          ids: [1],
        });
      expect(res.statusCode).equal(204);
    });
    it('validates the req body', async () => {
      const res = await globals.agent.deleteWithToken(`${routePrefix}/v1`)
        .send({});
      expect(res.statusCode).equal(400);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe(`GET ${routePrefix}/:date/v1`, () => {
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('gets records by date', async () => {
      const res = await globals.agent.getWithToken(`${routePrefix}/2018-07-31/v1`);
      expect(res.statusCode).equal(200);
      expect(res.body).toMatchSnapshot();
    });
    it('validates the req', async () => {
      const res = await globals.agent.getWithToken(`${routePrefix}/xyz/v1`);
      expect(res.statusCode).equal(400);
    });
  });

  describe(`GET ${routePrefix}/micro/:date/v1`, () => {
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('gets records by date', async () => {
      const res = await globals.agent.getWithToken(`${routePrefix}/micro/2018-07-31/v1`);
      expect(res.statusCode).equal(200);
      expect(res.body).toMatchSnapshot();
    });
    it('validates the req', async () => {
      const res = await globals.agent.getWithToken(`${routePrefix}/micro/xyz/v1`);
      expect(res.statusCode).equal(400);
    });
  });

  describe(`PUT ${routePrefix}/meal/v1`, () => {
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('updates the meal public status to true', async () => {
      const res = await globals.agent.putWithToken(`${routePrefix}/meal/v1`)
        .send({ mealId: 1 });
      expect(res.statusCode).equal(200);
      expect(res.body).toMatchSnapshot();
    });
    it('validates the req - mealId', async () => {
      const res = await globals.agent.putWithToken(`${routePrefix}/meal/v1`)
        .send({ mealId: 1000 });
      expect(res.statusCode).equal(400);
      expect(res.body).toMatchSnapshot();
    });
    it('validates the req - req.body', async () => {
      const res = await globals.agent.putWithToken(`${routePrefix}/meal/v1`)
        .send({});
      expect(res.statusCode).equal(400);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe(`PUT ${routePrefix}/quantity/v1`, () => {
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('updates the record quantity', async () => {
      const res = await globals.agent.putWithToken(`${routePrefix}/quantity/v1`)
        .send({ id: 1, seq: 1, quantity: 15 });
      expect(res.statusCode).equal(200);
      expect(res.body).toMatchSnapshot();
    });
    it('validates the req - req.body', async () => {
      const res = await globals.agent.putWithToken(`${routePrefix}/quantity/v1`)
        .send({});
      expect(res.statusCode).equal(400);
      expect(res.body).toMatchSnapshot();
    });
    it('validates the req - id', async () => {
      const res = await globals.agent.putWithToken(`${routePrefix}/quantity/v1`)
        .send({ id: 100000, seq: 1, quantity: 15 });
      expect(res.statusCode).equal(400);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe(`PUT ${routePrefix}/v1`, () => {
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('updates the food-record confirmation status', async () => {
      const res = await globals.agent.putWithToken(`${routePrefix}/v1`)
        .send({ ids: [1], confirmed: true });
      expect(res.statusCode).equal(204);
      expect(res.body).toMatchSnapshot();
    });
    it('validates the req - req.body', async () => {
      const res = await globals.agent.putWithToken(`${routePrefix}/v1`)
        .send({});
      expect(res.statusCode).equal(400);
      expect(res.body).toMatchSnapshot();
    });
    it('validates the req - req.body.confirmed', async () => {
      const res = await globals.agent.putWithToken(`${routePrefix}/v1`)
        .send({ ids: [1] });
      expect(res.statusCode).equal(400);
      expect(res.body).toMatchSnapshot();
    });
  });
});
