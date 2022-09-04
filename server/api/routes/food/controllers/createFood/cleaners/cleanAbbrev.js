const { foreignKeys } = require('@kym/db');

function cleanBody(body, uuid) {
  const {
    main,
    sub,
    calories,
    protein,
    carbohydrates,
    fat,
    servingDescription,
    servingWeight,
    servingSize
  } = body;

  return {
    main,
    sub,
    calories: convertToPer100(calories, servingWeight),
    protein: convertToPer100(protein, servingWeight),
    fat: convertToPer100(fat, servingWeight),
    carbohydrates: convertToPer100(carbohydrates, servingWeight),
    gmwt_1: servingWeight,
    gmwt_desc1: `${servingSize} ${servingDescription}`,
    [foreignKeys.USER]: uuid,
    photo: null
  };
}

function convertToPer100(macroWeight, servingWeight) {
  const macros = parseFloat(macroWeight);
  const serving = parseFloat(servingWeight);
  return Math.round((macros / serving) * 100 * 10) / 10;
}

module.exports = cleanBody;
