const { connectDatabase } = require('@kym/db');
const { User, Day } = connectDatabase();
const users = include('test-data/users.json');
const createUpdateDays = require('../');
const { expect } = require('chai');

describe('(unit) routes/day/createUpdateDays', () => {
  let user_id;
  let date;
  beforeEach(() => {
    user_id = 1;
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
      await createUpdateDays(null, date);
    } catch (err) {
      expect(err.message).equal('No user_id provided');
    }
  });
  it('returns an object', async () => {
    const day = await createUpdateDays(user_id, date);
    expect(day).eql({ [date]: true });
  });
});

