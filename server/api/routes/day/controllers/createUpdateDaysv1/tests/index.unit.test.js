const { connectDatabase } = require('@kym/db');
const { User, Day } = connectDatabase();
const users = include('test-data/users.json');
const createUpdateDays = require('../');
const { expect } = require('chai');

describe('(unit) routes/day/createUpdateDays', () => {
  let date;
  beforeEach(() => {
    date = '2018-08-01';
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
      await createUpdateDays({ uuid: null, days: { [date]: true } });
    } catch (err) {
      expect(err.message).equal('NO_UUID_PROVIDED');
    }
  });
  it('returns an array', async () => {
    const days = await createUpdateDays({ uuid: testData.users[0].uuid, days: { [date]: true } });
    expect(Array.isArray(days)).to.be.true;
    expect(days.length).eql(1);
  });
});
