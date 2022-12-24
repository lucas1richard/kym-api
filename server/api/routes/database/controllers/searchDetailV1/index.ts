import { AbbrevApi } from '@kym/db';
import Joi from 'joi';

type SearchDetailArg = {
  searchVal?: string;
  proteinPer?: number;
  carbsPer?: number;
  fatPer?: number;
  offset?: number;
};

const bodySchema = Joi.object().keys({
  searchVal: Joi.string().optional(),
  proteinPer: Joi.number().optional(),
  carbsPer: Joi.number().optional(),
  fatPer: Joi.number().optional(),
});

const searchDetail = async (data: SearchDetailArg) => {
  await bodySchema.validate(data, { abortEarly: false, allowUnknown: true });

  return AbbrevApi.searchDetail(data);
};

export default searchDetail;
