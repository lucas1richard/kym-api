const swaggerPaths = include('swagger/swaggerPaths');

swaggerPaths.addPath('/database/foodgroup', {
  get: {
    summary: 'Get the best food group for a food name',
    description: 'Get the best food group for a food name. Only the first part of the food name is used for finding the best group.',
    tags: ['database'],
    parameters: [{
      name: 'food',
      in: 'query',
      required: true,
      description: 'the food name split up by commas into an array',
      type: 'array',
      items: {
        type: 'string',
      },
      example: ['Avocado', 'Florida']
    }],
    responses: {
      200: {
        description: swaggerPaths.httpStatus(200, 'An object giving the group and group name'),
        schema: {
          type: 'object',
          properties: {
            group: {
              type: 'integer',
              example: 900
            },
            name: {
              type: 'string',
              example: 'Fruits and Fruit Juices'
            }
          }
        }
      },
      404: {
        description: swaggerPaths.httpStatus(404, 'No groups fit the description')
      }
    }
  }
}, {
  protected: true
});
