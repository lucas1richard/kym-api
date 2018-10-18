const { expect } = require('chai');
const findByDate = require('../findByDate');

describe('findByDate', () => {
  const model = {
    scope() {
      return this;
    },
    findAll() {
      return [];
    },
    findByDate
  };

  it('should be okay with date and user_id', () => {
    const allResults = model.findByDate('2018-01-01', 1);
    expect(allResults).to.eql([]);
  });
  it('should throw an error without a date', () => {
    try {
      model.findByDate(null, 1);
    } catch (err) {
      expect(err.message).to.equal('date should be a string');
    }
  });
  it('should throw an error without a user_id', () => {
    try {
      model.findByDate('2018-01-01', undefined);
    } catch (err) {
      expect(err.message).to.equal('No user_id specified');
    }
  });
});
