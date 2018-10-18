const swaggerPaths = include('swagger/swaggerPaths');

swaggerPaths.addPath('/food/{foodname}', {
  get: {
    tags: ['food'],
    summary: 'Get a list of foods based on the name',
    parameters: [{
      name: 'foodname',
      required: true,
      description: 'uri encoded string of a food name',
      in: 'path',
      type: 'string',
      example: 'apple'
    }, {
      name: 'offset',
      description: 'the database offset query multiple, defaults to 0',
      default: 0,
      in: 'query',
      type: 'string',
      example: '1'
    }],
    responses: {
      200: {
        description: swaggerPaths.httpStatus(200, 'A list of foods'),
        schema: {
          type: 'object',
          properties: {
            count: {
              type: 'integer',
              example: 158
            },
            query: {
              type: 'string',
              example: 'avocado'
            },
            offset: {
              type: 'integer',
              example: 0
            },
            rows: {
              type: 'array',
              items: {
                $ref: '#/definitions/Abbrev'
              }
            }
          }
        }
      }
    }
  }
}, {
  protected: true
});

swaggerPaths.addPath('/food', {
  post: {
    tags: ['food'],
    summary: 'Create a new food',
    parameters: [
      {
        name: 'body',
        required: true,
        in: 'body',
        schema: {
          type: 'object',
          properties: {
            calories: {
              type: 'string',
              example: '100'
            },
            protein: {
              type: 'string',
              example: '10'
            },
            carbohydrates: {
              type: 'string',
              example: '10'
            },
            fat: {
              type: 'string',
              example: '3'
            },
            main: {
              type: 'string',
              example: 'Potato'
            },
            sub: {
              type: 'string',
              example: 'Peeled, boiled'
            },
            group: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: 'Vegetables and Vegetable Products'
                },
                group: {
                  type: 'integer',
                  example: 1100
                }
              }
            },
            servingSize: {
              type: 'string',
              example: '1'
            },
            servingDescription: {
              type: 'string',
              example: 'potato'
            },
            servingWeight: {
              type: 'string',
              example: '120'
            }
          }
        }
      }
    ],
    responses: {
      201: {
        description: swaggerPaths.httpStatus(201, 'The food was successfully created in the database')
      },
      400: {
        description: swaggerPaths.httpStatus(400, 'A complete data set wasn\'t sent')
      }
    }
  }
}, {
  protected: true
})