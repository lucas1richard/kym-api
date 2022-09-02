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
          Main: { $iLike: '%test%' }
        }, {
          Sub: { $iLike: '%test%' }
        }]
      }]
    });
  });
  it('should return something else when there is a longer argument', () => {
    expect(makeInclWhere('test hello')).to.eql({
      [Op.and]: [{
        [Op.or]: [{
          Main: { $iLike: '%test%' }
        }, {
          Sub: { $iLike: '%test%' }
        }]
      }, {
        [Op.or]: [{
          Main: { $iLike: '%hello%' }
        }, {
          Sub: { $iLike: '%hello%' }
        }]
      }]
    });
  });
});
