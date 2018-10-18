const { bodySchema } = require('../validation');

// age: Joi.string().required(),
//   // birthdate: birthdateSchema,
// bmrBodyFat: Joi.number().allow(null).optional(),
// bmrTraditional: Joi.number(),
// bodyfat: Joi.number().allow(null).optional(),
// date: Joi.date().optional(),
// gender: Joi.string().valid(['MALE', 'FEMALE']),
// goal: Joi.string().valid(['Lose Fat', 'Maintain', 'Build Muscle']),
// height: Joi.string().alphanum(),
// lifestyle: Joi.string().valid(['Normal', 'Active', 'Sedentary']),
// units: Joi.string().valid(['imperial', 'metric']),
// updatedAt: Joi.date().required(),
// user_id: Joi.number().integer().required(),
// weight: Joi.string().regex(/^[1-9]\d*(\.\d+)?$/).required()

describe('bodySchema', () => {
  it('is okay', (done) => {
    const body = {
      age: '28',
      bmrBodyFat: null,
      bmrTraditional: 1878,
      bodyfat: null,
      date: '1900-01-02',
      gender: 'MALE',
      goal: 'Lose Fat',
      height: '73',
      lifestyle: 'Normal',
      units: 'imperial',
      updatedAt: '1990-01-01',
      user_id: 5,
      weight: '180.1'
    };
    bodySchema.validate(body, done);
  });
});
