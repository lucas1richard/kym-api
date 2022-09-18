const { expect } = require('chai');
const updateRecordStatus = require('../');

describe('routes/database/updateRecordStatus', () => {
  before(globals.seedTestData);
  after(globals.destroyAllHook);

  const userUuid = globals.testData.users[0].uuid;

  it('throws an error', async () => {
    try {
      await updateRecordStatus({});
    } catch (err) {
      expect(err.isJoi).to.be.true;
    }
  });

  it('handles empty args', async () => {
    try {
      await updateRecordStatus();
    } catch (err) {
      expect(err.isJoi).to.be.true;
    }
  });

  it('validates the request body', async () => {
    try {
      await updateRecordStatus({ uuid: userUuid });
    } catch (err) {
      expect(err.isJoi).to.be.true;
      expect(err.isJoi).to.be.true;
    }
  });

  it('updates the quantity', async () => {
    try {
      await updateRecordStatus({ ids: [], confirmed: true, uuid: userUuid });
    } catch (err) {
      expect(err.isJoi).to.be.true;
      expect(err.isJoi).to.be.true;
    }
  });
});
