const { proteinQuery, carbQuery, fatQuery } = require('./macronutrients');

function makePercentQuery({ proteinPer, carbsPer, fatPer }) {
  const obj = {};

  const pPer = parseFloat(proteinPer);
  const cPer = parseFloat(carbsPer);
  const fPer = parseFloat(fatPer);

  if (!isNaN(pPer)) {
    obj.ProteinH = proteinQuery((pPer / 100) - 0.05, '>');
    obj.ProteinL = proteinQuery((pPer / 100) + 0.05, '<');
  }

  if (!isNaN(fPer)) {
    obj.FatH = fatQuery((fPer / 100) - 0.05, '>');
    obj.FatL = fatQuery((fPer / 100) + 0.05, '<');
  }

  if (!isNaN(cPer)) {
    obj.CarbohydratesH = carbQuery((cPer / 100) - 0.05, '>');
    obj.CarbohydratesL = carbQuery((cPer / 100) + 0.05, '<');
  }

  return obj;
}

module.exports = makePercentQuery;
