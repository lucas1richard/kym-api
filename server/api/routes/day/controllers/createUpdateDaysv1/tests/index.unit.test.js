const createUpdateDays = require('../');
const { expect } = require('chai');

describe('(unit) routes/day/createUpdateDays', () => {
  let date;
  beforeEach(() => {
    date = '2018-08-01';
  });
  before(globals.seedTestData);
  after(globals.destroyAllHook);

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
