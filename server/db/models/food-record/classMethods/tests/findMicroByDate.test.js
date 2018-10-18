const { expect } = require('chai');
const findMicroByDate = require('../findMicroByDate');

describe('findMicroByDate', () => {
  const model = {
    scope() {
      return this;
    },
    findAll() {
      return [];
    },
    findMicroByDate
  };

  it('should be okay with date and user_id', () => {
    const allResults = model.findMicroByDate('2018-01-01', 1);
    expect(allResults).to.eql([]);
  });
  it('should throw an error without a date', () => {
    try {
      model.findMicroByDate(null, 1);
    } catch (err) {
      expect(err.message).to.equal('date should be a string');
    }
  });
  it('should throw an error without a user_id', () => {
    try {
      model.findMicroByDate('2018-01-01', undefined);
    } catch (err) {
      expect(err.message).to.equal('No user_id specified');
    }
  });
});
