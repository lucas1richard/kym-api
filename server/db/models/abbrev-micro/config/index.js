const sequelize = require('../../../conn');

const { Sequelize } = sequelize;

const decimalType = () => ({
  type: Sequelize.DECIMAL
});

const config = {
  Water: decimalType(),
  Ash: decimalType(),
  Fiber: decimalType(),
  Sugar: decimalType(),
  Calcium: decimalType(),
  Iron: decimalType(),
  Magnesium: decimalType(),
  Phosphorus: decimalType(),
  Potassium: decimalType(),
  Sodium: decimalType(),
  Zinc: decimalType(),
  Copper: decimalType(),
  Manganese: decimalType(),
  Selenium: decimalType(),
  Vit_C: decimalType(),
  Thiamin: decimalType(),
  Riboflavin: decimalType(),
  Niacin: decimalType(),
  Panto_acid: decimalType(),
  Vit_B6: decimalType(),
  Folate_Tot: decimalType(),
  Folic_acid: decimalType(),
  Food_Folate: decimalType(),
  Folate_DFE: decimalType(),
  Choline_Tot: decimalType(),
  Vit_B12: decimalType(),
  Vit_A_IU: decimalType(),
  Vit_A_RAE: decimalType(),
  Retinol: decimalType(),
  Alpha_Carot: decimalType(),
  Beta_Carot: decimalType(),
  Beta_Crypt: decimalType(),
  Lycopene: decimalType(),
  Lut_Zea: decimalType(),
  Vit_E: decimalType(),
  Vit_D_mcg: decimalType(),
  Vit_D_IU: decimalType(),
  Vit_K: decimalType(),
  FA_Sat: decimalType(),
  FA_Mono: decimalType(),
  FA_Poly: decimalType(),
  Cholestrl: decimalType()
};

module.exports = {
  config,
  decimalType
};
