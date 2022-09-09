const { Op } = require('@kym/db');
const { expect } = require('chai');
const foodQuery = require('../food');

describe('foodQuery', () => {
  it('handles when there\'s no food', () => {
    const query = foodQuery(['']);
    expect(query).to.eql({});
  });
  it('handles when there\'s food', () => {
    const query = foodQuery(['ham']);
    expect(query).to.eql({
      [Op.and]: [{
        [Op.or]: [{
          Main: { [Op.iLike]: '%ham%' }
        }, {
          Sub: { [Op.iLike]: '%ham%' }
        }],
      }]
    });
  });
  it('only deals with an array', () => {
    const query = foodQuery('ham');
    expect(query).to.eql({});
  });
});
