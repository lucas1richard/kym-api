const { USER } = include('db/foreignKeys');

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
    Main: main,
    Sub: sub,
    Calories: convertToPer100(calories, servingWeight),
    Protein: convertToPer100(protein, servingWeight),
    Fat: convertToPer100(fat, servingWeight),
    Carbohydrates: convertToPer100(carbohydrates, servingWeight),
    GmWt_1: servingWeight,
    GmWt_Desc1: `${servingSize} ${servingDescription}`,
    [USER]: uuid,
    photo: null
  };
}

function convertToPer100(macroWeight, servingWeight) {
  const macros = parseFloat(macroWeight);
  const serving = parseFloat(servingWeight);
  return Math.round((macros / serving) * 100 * 10) / 10;
}

module.exports = cleanBody;
