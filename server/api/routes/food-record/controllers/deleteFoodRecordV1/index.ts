import { FoodRecordApi } from '@kym/db';
import Joi from 'joi';


/**
 * Delete food records
 * {@link http://localhost:3000/api-docs/#/food-record/deleteapi_food_record}
 */
const deleteFoodRecord = async ({ ids, uuid }: { ids: number[]; uuid: string; }) => {
  await Joi.array().items(Joi.number().integer().required()).required().validate(ids);

  await FoodRecordApi.removeRecords({ ids, uuid });

  return ids;
};

export default deleteFoodRecord;
module.exports = deleteFoodRecord;
