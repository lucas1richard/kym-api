import { FoodRecordApi } from '@kym/db';
import Joi from 'joi';

export type AddFoodRecordArg = {
  abbrevId: number;
  date: string;
  meal: number;
  quantity: number;
  unit: string;
  uuid: string;
  confirmed: boolean;
};

const recordSchema = Joi.object().keys({
  abbrevId: Joi.number().required(),
  date: Joi.string().required(),
  meal: Joi.number().required(),
  quantity: Joi.number().required(),
  unit: Joi.number().required(),
  confirmed: Joi.bool().optional(),
});

const dataSchema = Joi.array().items(recordSchema);

/**
 * Add a food record
 * {@link http://localhost:3000/api-docs/#/food-record/postapi_food_record}
 */
const addFoodRecord = async ({ uuid, data }: { uuid: string; data: AddFoodRecordArg[] }) => {
  await dataSchema.validate(data, { allowUnknown: true, abortEarly: false });
  const createRecordArray = data.map(function addRecord(item) {
    return FoodRecordApi.addNewRecord({
        ...item,
        uuid,
    });
  });

  // Create records
  const foods = await Promise.all(createRecordArray);

  return foods;
};

export default addFoodRecord;
module.exports = addFoodRecord;
