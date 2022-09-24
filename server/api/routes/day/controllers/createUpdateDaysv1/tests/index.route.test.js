const { assert } = require('chai');

describe('(route) day/controllers/createUpdateDays', () => {
  before(globals.seedTestData);
  after(globals.destroyAllHook);
  it('creates days', (done) => {
    globals.agent
      .postWithToken('/api/day/days/V1')
      .send({ '2018-08-02': true })
      .expect((res) => {
        assert(Array.isArray(res.body), 'Should have days');
      })
      .expect(201, done);
  });
  it('handles errors', (done) => {
    globals.agent
      .postWithToken('/api/day/days/V1')
      .send({ data: 100 })
      .expect(500, done);
  });
});
