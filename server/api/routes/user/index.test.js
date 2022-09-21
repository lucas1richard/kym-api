const { expect, use } = require('chai');
const { jestSnapshotPlugin } = require('mocha-chai-jest-snapshot');

describe('user routes', () => {
  use(jestSnapshotPlugin());
  const routePrefix = '/api/user';

  describe(`GET ${routePrefix}/v1`, () => {
    const route = `${routePrefix}/v1`;
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('gets the user', async () => {
      const res = await globals.agent.getWithToken(route);
      expect(res.statusCode).equal(200);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe(`PUT ${routePrefix}/v1`, () => {
    const route = `${routePrefix}/v1`;
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('updates the user', async () => {
      const res = await globals.agent.putWithToken(route).send({ firstname: 'Mockname' });
      expect(res.statusCode).equal(201);
      expect(res.body.firstname).equal('Mockname');
    });
    it('validats the req', async () => {
      const res = await globals.agent.putWithToken(route).send({ firstname: 1 });
      expect(res.statusCode).equal(400);
    });
  });

  describe(`POST ${routePrefix}/measurements/v1`, () => {
    const route = `${routePrefix}/measurements/v1`;
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    const measurementBody = {
      date: '2022-09-01',
      weight: '84',
      age: '33',
      gender: 'MALE',
      goal: 'LOSE_FAT',
      height: '186',
      lifestyle: 'NORMAL',
      units: 'METRIC',
    };

    it('creates measurements for a user for the current date', async () => {
      const res = await globals.agent.postWithToken(route).send({
        ...measurementBody,
        date: undefined,
      });
      expect(res.statusCode).equal(201);
      expect(res.body.weight).equal('84');
    });

    it('creates measurements for a user', async () => {
      const res = await globals.agent.postWithToken(route).send(measurementBody);
      expect(res.statusCode).equal(201);
      expect(res.body.weight).equal('84');
    });

    it('modifies existing measurements for a user', async () => {
      const res = await globals.agent.postWithToken(route).send({
        ...measurementBody,
        weight: '83',
      });
      expect(res.statusCode).equal(201);
      expect(res.body.weight).equal('83');
    });
    it('validates the req', async () => {
      const res = await globals.agent.postWithToken(route).send({});
      expect(res.statusCode).equal(400);
    });
  });

  describe(`PUT ${routePrefix}/measurements/v1`, () => {
    const route = `${routePrefix}/measurements/v1`;
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    const measurementBody = {
      id: 1,
      date: '2022-09-01',
      weight: '84',
      age: '33',
      gender: 'MALE',
      goal: 'LOSE_FAT',
      height: '186',
      lifestyle: 'NORMAL',
      units: 'METRIC',
    };

    it('creates measurements for a user for the current date', async () => {
      const res = await globals.agent.putWithToken(route).send({
        ...measurementBody,
      });
      expect(res.statusCode).equal(201);
      expect(res.body.weight).equal('84');
    });

    it('ensures the measurment exists before updating', async () => {
      const res = await globals.agent.putWithToken(route).send({
        ...measurementBody,
        id: 10000000,
      });
      expect(res.statusCode).equal(400);
    });
  });

  describe(`DELETE ${routePrefix}/measurements/v1`, () => {
    const route = `${routePrefix}/measurements/v1`;
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('deletes a measurement', async () => {
      const res = await globals.agent.deleteWithToken(route).send({
        id: 1,
      });
      expect(res.statusCode).equal(204);
    });

    it('validates the req', async () => {
      const res = await globals.agent.deleteWithToken(route).send({});
      expect(res.statusCode).equal(400);
    });
  });
});
