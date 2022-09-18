const { connectDatabase } = require('@kym/db');
const { USER } = require('@kym/db/dist/foreignKeys');
const AppError = require('../../../../../configure/appError');
const { dataSchema } = require('./validation');

const { FoodRecord } = connectDatabase();

const updateQuantity = async ({ data = {}, uuid } = {}) => {
  await dataSchema.validate(data);

  const {
    id, // foodRecord id
    seq, // the weight unit (`unit`)
    quantity, // the number of `unit`
  } = data;

  await FoodRecord.update({ seq, quantity }, { where: { id, [USER]: uuid } });

  // Find the record again and send back with macros
  const rawNewRecord = await FoodRecord.scope('withMacros').findByPk(id);

  if (!rawNewRecord) throw new AppError(400, { devmessage: 'NO_RECORD_FOUND' });

  const newRecord = await rawNewRecord.calMacros();

  return newRecord;
};

module.exports = updateQuantity;
