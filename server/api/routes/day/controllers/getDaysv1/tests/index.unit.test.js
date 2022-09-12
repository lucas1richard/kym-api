const { connectDatabase } = require('@kym/db');
const { User, Day } = connectDatabase();
const users = include('test-data/users.json');
const getDaysV1 = require('../');
const { expect } = require('chai');

describe('routes/day/getDays', () => {
  let userId;
  beforeEach(() => {
    userId = users[0].uuid;
  });
  before(async () => {
    await User.bulkCreate(users);
  });
  after(async () => {
    await User.destroy({ where: {}, force: true });
    await Day.destroy({ where: {}, force: true });
  });
  it('doesn\'t catch an error', async () => {
    try {
      await getDaysV1(null);
    } catch (err) {
      expect(err.message).equal('NO_UUID_PROVIDED');
    }
  });
  it('returns an object', async () => {
    const day = await getDaysV1(userId);
    expect(day).eql({});
  });
});
