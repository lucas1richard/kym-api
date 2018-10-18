const getMacros = require('../utils/getMacros');

/**
 * Convert grams to ounces
 * @param {number} gr grams
 */
const convertOz = (gr) => Math.round((gr * 10) / 28.4) / 10;

/**
 * Reformat results
 * @param {number} gr
 * @param {object} factor
 */
function formatResults(gr, factor) {
  return {
    foods: factor.foods,
    weight: {
      gr,
      oz: convertOz(gr)
    },
    macros: getMacros(gr, factor)
  };
}

module.exports = formatResults;
