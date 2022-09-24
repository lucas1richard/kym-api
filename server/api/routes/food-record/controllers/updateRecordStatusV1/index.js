const { connectDatabase, foreignKeys } = require('@kym/db');
const { USER } = require('@kym/db/dist/foreignKeys');
const { FoodRecord } = connectDatabase();
const { idsSchema, confirmedSchema } = require('./validation');

const updateRecordStatus = async ({ ids, confirmed, uuid } = {}) => {
  await foreignKeys.USER_VALIDATION.validate(uuid);
  await idsSchema.validate(ids);
  await confirmedSchema.validate(confirmed);

  await FoodRecord.update({ confirmed }, { where: { id: ids, [USER]: uuid } });
};

module.exports = updateRecordStatus;
