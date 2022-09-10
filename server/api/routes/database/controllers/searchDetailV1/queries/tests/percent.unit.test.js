const { expect } = require('chai');
const makePercentQuery = require('../percent');
const { proteinQuery, carbQuery, fatQuery } = require('../macronutrients');

describe('percentQuery', () => {
  it('makes an empty query with invalid percents', () => {
    const proteinPer = '';
    const carbsPer = '';
    const fatPer = '';
    const query = makePercentQuery({ proteinPer, carbsPer, fatPer });
    expect(query).to.eql({});
  });

  it('makes an query with valid percents', () => {
    const proteinPer = '5';
    const carbsPer = '5';
    const fatPer = '5';
    const query = makePercentQuery({ proteinPer, carbsPer, fatPer });
    expect(query).to.eql({
      ProteinH: proteinQuery((5 / 100) - 0.05, '>'),
      ProteinL: proteinQuery((5 / 100) + 0.05, '<'),
      FatH: fatQuery((5 / 100) - 0.05, '>'),
      FatL: fatQuery((5 / 100) + 0.05, '<'),
      CarbohydratesH: carbQuery((5 / 100) - 0.05, '>'),
      CarbohydratesL: carbQuery((5 / 100) + 0.05, '<'),
    });
  });
});
