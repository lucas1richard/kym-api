const { proteinQuery, carbQuery, fatQuery } = require('./macronutrients');

function makePercentQuery({ proteinPer, carbsPer, fatPer }) {
  const obj = {};

  const getRounded = (val) => Math.round(val * 1000) / 1000;

  const pPer = getRounded(parseFloat(proteinPer));
  const cPer = getRounded(parseFloat(carbsPer));
  const fPer = getRounded(parseFloat(fatPer));

  if (!Number.isNaN(pPer)) {
    obj.ProteinH = proteinQuery((pPer / 100) - 0.05, '>');
    obj.ProteinL = proteinQuery((pPer / 100) + 0.05, '<');
  }

  if (!Number.isNaN(fPer)) {
    obj.FatH = fatQuery((fPer / 100) - 0.05, '>');
    obj.FatL = fatQuery((fPer / 100) + 0.05, '<');
  }

  if (!Number.isNaN(cPer)) {
    obj.CarbohydratesH = carbQuery((cPer / 100) - 0.05, '>');
    obj.CarbohydratesL = carbQuery((cPer / 100) + 0.05, '<');
  }

  return obj;
}

module.exports = makePercentQuery;
