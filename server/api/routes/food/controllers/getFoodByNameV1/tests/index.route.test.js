describe('food api (GET :foodname)', () => {
  before(globals.seedTestData);
  after(globals.destroyAllHook);
  it('should get a food', async () => {
    await globals.agent.getWithToken('/api/food/chicken/v1?offset=0')
      .expect(200);
  });
});
