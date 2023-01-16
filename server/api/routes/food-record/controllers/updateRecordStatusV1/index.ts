import { FoodRecordApi } from '@kym/db';
import Joi from 'joi';

const idsSchema = Joi.array().items(
  Joi.number().integer().required(),
).required().error(() => 'IDS_REQUIRED');

const confirmedSchema = Joi.bool().required().error(() => 'CONFIRMED_IS_REQUIRED');

export type UpdateRecordsStatusArg = { ids: number[]; uuid: string; confirmed: boolean };

const updateRecordStatus = async ({ ids, confirmed, uuid }: UpdateRecordsStatusArg) => {
  await idsSchema.validate(ids);
  await confirmedSchema.validate(confirmed);

  await FoodRecordApi.updateRecordsStatus({ confirmed, ids, uuid });
};

export default updateRecordStatus;
module.exports = updateRecordStatus;
