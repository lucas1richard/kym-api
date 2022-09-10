const { connectDatabase } = require('@kym/db');
const { USER } = require('@kym/db/dist/foreignKeys');
const { handleRouteError } = include('utils/handleRouteError');
const { bodySchema } = require('./validation');

const { FoodRecord } = connectDatabase();

const updateQuantity = async (req, res, next) => {
  try {
    // Validate
    await bodySchema.validate(req.body);

    const {
      id, // foodRecord id
      seq, // the weight unit (`unit`)
      quantity, // the number of `unit`
    } = req.body;

    await FoodRecord.update({ seq, quantity }, { where: { id, [USER]: res.locals.uuid } });

    // Find the record again and send back with macros
    const rawNewRecord = await FoodRecord.scope('withMacros').findByPk(id);

    const newRecord = await rawNewRecord.calMacros();

    res.json(newRecord);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t update the record');
    next(err);
  }
};

module.exports = updateQuantity;
