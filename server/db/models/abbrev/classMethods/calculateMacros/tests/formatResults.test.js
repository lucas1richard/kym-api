const { expect } = require('chai');
const formatResults = require('../formatResults');

describe('/db/models/abbrev/classMethods/calculateMacros/formatResults', () => {
  it('should return valid with arguments', () => {
    const gr = 15;
    const foods = ['food1', 'food2'];
    const factor = {
      foods,
      p: 10,
      c: 11,
      f: 12,
      weight: 100
    };
    expect(formatResults(gr, factor)).to.eql({
      foods,
      weight: {
        gr,
        oz: 0.5
      },
      macros: {
        carbs: 1.7,
        fat: 1.8,
        protein: 1.5
      }
    });
  });
});
