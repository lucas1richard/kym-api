import { FoodRecordApi } from '@kym/db';
import Joi from 'joi';

const dataSchema = Joi.object().keys({
  quantity: Joi.number().required(),
  seq: Joi.number().required(),
  id: Joi.number().integer().required(),
});

export interface UpdateQuantityData {
  id: number;
  seq: string;
  quantity: number;
};

const updateQuantity = async ({ data, uuid }: { data: UpdateQuantityData, uuid: string }) => {
  await dataSchema.validate(data);

  const {
    id, // foodRecord id
    seq, // the weight unit (`unit`)
    quantity, // the number of `unit`
  } = data;

  return FoodRecordApi.updateRecordQuantity({ seq, quantity, id, uuid });
};

export default updateQuantity;
module.exports = updateQuantity;
