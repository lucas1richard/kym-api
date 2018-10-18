const swaggerPaths = include('swagger/swaggerPaths');

swaggerPaths.addPath('/calculate', {
  get: {
    summary: 'Calculate the food content of a meal',
    description: 'Given the macronutrient goals and food identifiers, calculate the correct proportions of foods to reach the macronutrient goals',
    tags: ['calculate'],
    parameters: [
      {
        name: 'id',
        in: 'query',
        description: 'Record ids',
        example: '5470, 2514, 3079, 2447',
        required: true,
        schema: {
          type: 'array',
          items: {
            type: 'integer',
            description: 'Identifies the record'
          }
        }
      }, {
        name: 'proteinGoal',
        example: 20,
        description: 'The protein goal, in grams',
        in: 'query',
        required: true,
        schema: {
          type: 'number'
        }
      }, {
        name: 'carbGoal',
        example: 30,
        description: 'The carbohydrate goal, in grams',
        in: 'query',
        required: true,
        schema: {
          type: 'number'
        }
      }, {
        name: 'fatGoal',
        example: 10,
        description: 'The fat goal, in grams',
        required: true,
        in: 'query',
        schema: {
          type: 'number'
        }
      }
    ],
    responses: {
      200: {
        $ref: '#/definitions/MealCalculation'
      },
      400: {
        description: '`type` must be \'train\' or \'rest\''
      }
    }
  }
}, {
  protected: true
});

swaggerPaths.addPath('/calculate/day', {
  get: {
    summary: 'Calculate all meals for a day',
    tags: [
      'calculate'
    ],
    parameters: [{
      name: 'type',
      description: '\'train\' or \'rest\'',
      type: 'string',
      in: 'query',
      enum: ['train', 'rest']
    }],
    responses: {
      200: {
        type: 'array',
        items: {
          required: false,
          $ref: '#/definitions/MealCalculation'
        }
      }
    }
  }
}, {
  protected: true
});
