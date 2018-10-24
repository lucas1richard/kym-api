const { promisify } = require('util');

/**
 * @return {{ id: number, Quantity: number, Date: Date, Unit: string, Seq: string, Gr: number, Calories: number, Protein: number, Fat: number, Carbohydrates: number }}
 * @this food-record
 */
function calMacrosSync(cb) {
  /** The raw data for the record */
  const { abbrev } = this;

  if (!abbrev) {
    return cb(new Error('No abbrev parameter found'));
  }
  if (!abbrev.weights) {
    return cb(new Error('No weights parameter found on abbrev parameter'));
  }

  /** The weight which corresponds to the unit parameter */
  const weight = abbrev.weights.filter((wght) => wght.Seq * 1 === this.Unit * 1)[0];

  if (!weight) {
    return cb(new Error('No weight corresponds to the Unit parameter'));
  }

  /** A combination of the record and it's properties */
  const record = Object.assign({}, this.get(), abbrev.dataValues, {
    id: this.id,
    Quantity: this.Quantity * 1,
    Date: this.Date,
    Unit: weight.Description,
    Seq: this.Unit,
    Gr: weightInGrams(weight, this.Quantity)
  });

  /** Get the Calories, Protein, Carbohydrates, and Fat contributed by the record */
  ['Calories', 'Protein', 'Carbohydrates', 'Fat'].forEach((param) => {
    record[param] = Math.round(this.abbrev[param] * (record.Gr / 100) * 10) / 10;
  });

  return cb(null, record);
}

function weightInGrams(weight, quantity) {
  return Math.round((weight.Gr_Wgt / weight.Amount) * parseFloat(quantity));
}

const calMacros = promisify(calMacrosSync);

module.exports = calMacros;
