const swaggerPaths = include('swagger/swaggerPaths');

swaggerPaths.addPath('/generate', {
  get: {
    tags: ['generate'],
    responses: {
      200: {
        id: {
          type: 'integer',
          example: 1546,
        },
        foodName: {
          type: 'string',
          example: 'Avocado, raw Florida',
        },
      },
    },
  },
});

swaggerPaths.addPath('/generate/calculate', {
  get: {
    tags: ['generate'],
    parameters: [{
      name: 'proteinGoal',
      in: 'query',
    }, {
      name: 'carbGoal',
      in: 'query',
    }, {
      name: 'fatGoal',
      in: 'query',
    }],
    responses: {
      200: {

      },
    },
  },
});
