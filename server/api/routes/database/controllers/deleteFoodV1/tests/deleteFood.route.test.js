const { connectDatabase } = require('@kym/db');
const { Abbrev, User } = connectDatabase();

const path = '/api/database/user-created/v1';

describe('deleteFood route', () => {
  let body;
  before(async () => {
    await User.destroy({ where: {}, force: true });
    await Abbrev.destroy({ where: {}, force: true });
  });
  beforeEach(async () => {
    await User.bulkCreate(testData.users);
    await Abbrev.bulkCreate(testData.abbrevs);
    body = {
      id: 2514,
    };
  });
  afterEach(async () => {
    await User.destroy({ where: {}, force: true });
    await Abbrev.destroy({ where: {}, force: true });
  });
  it('deletes a food created by the user', async () => {
    await globals.agent
      .deleteWithToken(path)
      .send(body)
      .expect(204);
  });
  it('fails when food wasn\'t created by the user', async () => {
    await globals.agent.delete(path)
      .set('token', testData.tokens.user1)
      .send(body)
      .expect(401);
  });
  it('fails when food doesn\'t exist', async () => {
    body.id = 900000000000000;
    await globals.agent
      .deleteWithToken(path)
      .send(body)
      .expect(404);
  });
  it('fails when the request is malformed', async () => {
    body.id = 'something absurd';
    await globals.agent
      .deleteWithToken(path)
      .send(body)
      .expect(400);
  });
});
