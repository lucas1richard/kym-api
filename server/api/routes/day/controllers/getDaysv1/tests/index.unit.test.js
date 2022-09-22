const { expect } = require('chai');
const getDaysV1 = require('../');

describe('routes/day/getDays', () => {
  const uuid = globals.testData.users[0].uuid;
  it('doesn\'t catch an error', async () => {
    try {
      await getDaysV1(null);
    } catch (err) {
      expect(err.message).equal('NO_UUID_PROVIDED');
    }
  });
  it('returns an object', async () => {
    const day = await getDaysV1(uuid);
    expect(day).eql({});
  });
});
