const { FoodRecord } = include('db');
const { handleRouteError } = include('utils/handleRouteError');
const { bodySchema } = require('./validation');

const updateQuantity = async (req, res, next) => {
  try {
    // Validate
    await bodySchema.validate(req.body);

    const { id, seq, quantity } = req.body;

    // Find the record and update the quantity
    const record = await FoodRecord.findById(id);
    await record.updateQuantity({
      seq,
      quantity
    });

    // Find the record again and send back with macros
    const rawNewRecord = await FoodRecord.findById(id);

    const newRecord = await rawNewRecord.calMacros();

    res.json(newRecord);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t update the record');
    next(err);
  }
};

module.exports = updateQuantity;
