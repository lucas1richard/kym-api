import { UserMeasurementApi } from '@kym/db';
import Joi from 'joi';

const bodySchema = Joi.object().keys({
  age: Joi.string().required().error(() => 'AGE_NOT_PROVIDED'),
  gender: Joi.string().valid(['MALE', 'FEMALE']).required(),
  goal: Joi.string().valid(['LOSE_FAT', 'MAINTAIN', 'GAIN_MUSCLE']).required(),
  height: Joi.string().regex(/^[1-9]\d*(\.\d+)?$/).required(),
  lifestyle: Joi.string().valid(['NORMAL', 'ACTIVE', 'SEDENTARY']).required(),
  units: Joi.string().valid(['IMPERIAL', 'METRIC']).required(),
  weight: Joi.string().regex(/^[1-9]\d*(\.\d+)?$/).required(),
  // birthdate: birthdateSchema,
  bmrBodyFat: Joi.number().allow(null).optional(),
  bmrTraditional: Joi.number().optional(),
  bodyfat: Joi.number().allow(null).optional(),
  date: Joi.date().optional(),
  // updatedAt: Joi.date().optional(),
  // createdAt: Joi.date().optional(),
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

const createMeasurementsV1 = async ({ data, uuid }: { data: UserMeasurementsData, uuid: string}) => {
  await bodySchema.validate(data, { abortEarly: false, allowUnknown: true });

  return UserMeasurementApi.createMeasurement({ data, uuid });
};

export default createMeasurementsV1;
module.exports = createMeasurementsV1;
