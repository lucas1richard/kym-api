/**
 * @module models/abbrev/classMethods/getMacros
 */

module.exports = getMacros;

/**
 * Calculate the macronutrients of a factor
 * @param {number} gramsWeight
 * @param {{p: number, c: number, f: number, weight: number}} factor
 */
function getMacros(gramsWeight, factor) {
  /** @param {number} macro */
  const round10 = (macro) => Math.round((gramsWeight * macro * 10) / factor.weight) / 10;

  return {
    protein: round10(factor.p),
    carbs: round10(factor.c),
    fat: round10(factor.f)
  };
}
