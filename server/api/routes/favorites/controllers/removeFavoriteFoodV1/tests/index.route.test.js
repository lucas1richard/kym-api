describe('favorites/controllers/removeFood', () => {
  let body;
  beforeEach(async () => {
    await globals.seedTestData();
    body = {
      abbrevId: 2514,
      meal: 3,
    };
  });
  afterEach(globals.destroyAllHook);
  it('removes a favorite successfully', (done) => {
    globals.agent
      .deleteWithToken('/api/favorites/food/v1')
      .send(body)
      .expect(204, done);
  });
  it('fails with a bad request', (done) => {
    delete body.meal;
    globals.agent
      .deleteWithToken('/api/favorites/food/v1')
      .send(body)
      .expect(400, done);
  });
});
