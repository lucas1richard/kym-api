const sequelize = require('../../conn');
const getterMethods = require('./getterMethods');

const { Sequelize } = sequelize;

const decimalType = () => ({
  type: Sequelize.DECIMAL
});

const AbbrevMicro = sequelize.define('abbrevMicro', {
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
},
{
  getterMethods,
  instanceMethods: {
    syncAbbrevId() {
      return sequelize.models.abbrev.findOne({
        where: {
          NDB_No: this.NDB_No
        }
      })
        .then((abbrev) => {
          if (abbrev) {
            this.abbrevId = abbrev.id;
            return this.save();
          }
          return Promise.resolve();
        })
        .then(() => {
          // eslint-disable-next-line no-console
          console.log(this.NDB_No, this.id, this.abbrevId);
        });
    }
  }
});

AbbrevMicro.prototype.syncAbbrevId = function syncAbbrevId() {
  return sequelize.models.abbrev.findOne({
    where: {
      NDB_No: this.NDB_No
    }
  })
    .then((abbrev) => {
      if (abbrev) {
        this.abbrevId = abbrev.id;
        return this.save();
      }
      return Promise.resolve();
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log(this.NDB_No, this.id, this.abbrevId);
    });
};

module.exports = AbbrevMicro;
