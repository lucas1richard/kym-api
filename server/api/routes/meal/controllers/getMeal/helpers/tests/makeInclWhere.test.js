const { connectDatabase } = require('@kym/db');
const { sequelize } = connectDatabase();
const { expect } = require('chai');
const makeInclWhere = require('../makeInclWhere');

const { Op } = sequelize;

describe('meal/controllers/getMeal/helpers/makeInclWhere', () => {
  it('should return {} when theres no argument', () => {
    expect(makeInclWhere()).to.eql({});
  });
  it('should return something else when there is an argument', () => {
    expect(makeInclWhere('test')).to.eql({
      [Op.and]: [{
        [Op.or]: [{
          main: { $iLike: '%test%' }
        }, {
          sub: { $iLike: '%test%' }
        }]
      }]
    });
  });
  it('should return something else when there is a longer argument', () => {
    expect(makeInclWhere('test hello')).to.eql({
      [Op.and]: [{
        [Op.or]: [{
          main: { $iLike: '%test%' }
        }, {
          sub: { $iLike: '%test%' }
        }]
      }, {
        [Op.or]: [{
          main: { $iLike: '%hello%' }
        }, {
          sub: { $iLike: '%hello%' }
        }]
      }]
    });
  });
});
