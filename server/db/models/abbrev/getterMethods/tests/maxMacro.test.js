const { expect } = require('chai');
const maxMacro = require('../maxMacro');

describe('maxMacro', () => {
  it('sorts when all values are different', () => {
    const item = {
      Protein: 5,
      Carbohydrates: 6,
      Fat: 4,
      maxMacro
    };
    expect(item.maxMacro()).to.equal('Carbohydrates');
  });

  it('sorts when some values are the same', () => {
    const item = {
      Protein: 6,
      Carbohydrates: 6,
      Fat: 4,
      maxMacro
    };
    expect(item.maxMacro()).to.equal('Protein');
  });
});
