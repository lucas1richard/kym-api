const { connectDatabase } = require('@kym/db');
const { User, Day } = connectDatabase();
const users = include('test-data/users.json');
const destroyDays = require('../');
const { expect } = require('chai');

describe('(unit) routes/day/destroyDays', () => {
  let date;
  beforeEach(() => {
    date = ['2018-08-01'];
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
      await destroyDays(null, date);
    } catch (err) {
      expect(err.message).equal('NO_UUID_PROVIDED');
    }
  });
  it('returns an object', async () => {
    const day = await destroyDays(testData.users[0].uuid, date);
    expect(day).equal(date);
  });
});
