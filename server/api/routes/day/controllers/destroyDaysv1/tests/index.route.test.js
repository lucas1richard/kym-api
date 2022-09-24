describe('(route) day/controllers/destroyDays', () => {
  beforeEach(globals.seedTestData);
  afterEach(globals.destroyAllHook);
  it('destroys days', (done) => {
    globals.agent.deleteWithToken('/api/day/days/V1')
      .send(['2018-08-02'])
      .expect(204, done);
  });
  it('handles errors', (done) => {
    globals.agent.deleteWithToken('/api/day/days/v1')
      .expect(500, done);
  });
});
