const { User, Day } = include('db');
const users = include('test-data/users');
const { getDays, daysReduce } = require('../');
const { expect } = require('chai');

describe('routes/day/getDays', () => {
  let user_id;
  beforeEach(() => {
    user_id = 1;
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
      await getDays(null);
    } catch (err) {
      expect(err.message).equal('No user_id provided');
    }
  });
  it('returns an object', async () => {
    const day = await getDays(user_id);
    expect(day).eql({});
  });

  describe('daysReduce', () => {
    it('returns an object', () => {
      const memo = {};
      const day = { date: '2018-08-01', dayType: 'train' };
      expect(daysReduce(memo, day)).eql({
        '2018-08-01': 'train'
      });
    });
  });
});

