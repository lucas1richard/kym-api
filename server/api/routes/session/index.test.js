const { expect, use } = require('chai');
const { jestSnapshotPlugin } = require('mocha-chai-jest-snapshot');

describe('session routes', () => {
  use(jestSnapshotPlugin());
  const routePrefix = '/api/session';

  describe(`GET ${routePrefix}/token/v1`, () => {
    const route = `${routePrefix}/token/v1`;
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('gets user from token', async () => {
      const res = await globals.agent.getWithToken(route);
      expect(res.statusCode).equal(200);
      expect(res.body).toMatchSnapshot();
    });

    it('handles errors', async () => {
      const res = await globals.agent.get(route);
      expect(res.statusCode).equal(500);
    });
  });
  describe(`POST ${routePrefix}/signin/v1`, () => {
    const route = `${routePrefix}/signin/v1`;
    before(globals.seedTestData);
    after(globals.destroyAllHook);

    it('signs in and sends token', async () => {
      const { email, password } = globals.testData.users[0];
      const res = await globals.agent.post(route)
        .send({ email, password });
      expect(res.statusCode).equal(200);
      expect(res.body).toMatchSnapshot();
    });

    it('handles errors', async () => {
      const { email } = globals.testData.users[0];
      const res = await globals.agent.post(route)
        .send({ email, password: 'mockPassword' });
      expect(res.statusCode).equal(401);
    });
  });
  describe(`POST ${routePrefix}/signup/v1`, () => {
    const route = `${routePrefix}/signup/v1`;
    const userMeasurements = {
      gender: 'MALE',
      goal: 'LOSE_FAT',
      height: '73',
      date: '2018-01-01',
      lifestyle: 'NORMAL',
      units: 'IMPERIAL',
      weight: '179',
    };
    const body = {
      birthdate: '1989-01-01',
      email: 'test@test.test',
      firstname: 'Test',
      lastname: 'Test',
      password: '1234',
      preferredlocale: 'en-US',
      loggedIn: false,
    };
    beforeEach(globals.destroyAllHook);
    after(globals.destroyAllHook);
    it('signs up successfully', async () => {
      const res = await globals.agent.post(route)
        .send(body);
      expect(res.statusCode).equal(201);
    });
    it('signs up successfully with measurements', async () => {
      const res = await globals.agent.post(route)
        .send({
          ...body,
          userMeasurements,
        });
      expect(res.statusCode).equal(201);
    });
    it('fails with duplicate email', async () => {
      await globals.agent.post(route).send(body).expect(201);
      await agent.post(route).send(body).expect(400);
    });
    it('fails with duplicate email with measurements', async () => {
      await globals.agent.post(route).send({ ...body, userMeasurements }).expect(201);
      await globals.agent.post(route).send({ ...body, userMeasurements }).expect(400);
    });
    it('fails when there\'s a bad request', async () => {
      await globals.agent.post(route)
        .send({ ...body, firstname: undefined })
        .expect(400);
    });
  });
});
