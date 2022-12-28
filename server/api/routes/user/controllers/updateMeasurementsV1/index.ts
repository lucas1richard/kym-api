import { UserMeasurementApi } from '@kym/db';
import Joi from 'joi';

const bodySchema = Joi.object().keys({
  id: Joi.number(),
  age: Joi.string().required(),
  bmrBodyFat: Joi.number().allow(null).optional(),
  bmrTraditional: Joi.number(),
  bodyfat: Joi.number().allow(null).optional(),
  date: Joi.date(),
  gender: Joi.string().valid(['MALE', 'FEMALE']),
  goal: Joi.string().valid(['LOSE_FAT', 'MAINTAIN', 'GAIN_MUSCLE']),
  height: Joi.string().alphanum(),
  lifestyle: Joi.string().valid(['NORMAL', 'ACTIVE', 'SEDENTARY']),
  units: Joi.string().valid(['IMPERIAL', 'METRIC']),
  weight: Joi.string().regex(/^[1-9]\d*(\.\d+)?$/).required(),
});

type UserMeasurementsData = {
  age?: number;
  gender?: 'MALE' | 'FEMALE';
  height?: number;
  units?: 'IMPERIAL' | 'METRIC';
  weight?: number;
  bodyfat?: number;
  lifestyle?: 'SEDENTARY' | 'NORMAL' | 'ACTIVE';
  goal?: 'LOSE_FAT' | 'GAIN_MUSCLE' | 'MAINTAIN';
  date?: string;
  bmrTraditional?: number;
  bmrBodyFat?: number;
};

const updateMeasurementsV1 = async ({ data, uuid }: { data: UserMeasurementsData, uuid: string }) => {
  await bodySchema.validate(data);
  const measurement = await UserMeasurementApi.updateMeasurement({ data, uuid });

  return measurement;
};

export default updateMeasurementsV1;
module.exports = updateMeasurementsV1;
