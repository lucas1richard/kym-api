const { USER } = include('db/foreignKeys');
const swaggerPaths = include('swagger/swaggerPaths');

swaggerPaths.addPath('/goals/meals', {
  post: {
    tags: ['goals'],
    parameters: [
      {
        name: 'body',
        in: 'body',
        schema: {
          type: 'object',
          properties: {
            train: {
              type: 'array',
              items: {
                $ref: '#/definitions/Goal'
              }
            },
            rest: {
              type: 'array',
              items: {
                $ref: '#/definitions/Goal'
              }
            }
          }
        }
      }
    ],
    responses: {
      200: {
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 6
            },
            goals: {
              type: 'object',
              properties: {
                train: {
                  type: 'array',
                  items: {
                    $ref: '#/definitions/Goal'
                  }
                },
                rest: {
                  type: 'array',
                  items: {
                    $ref: '#/definitions/Goal'
                  }
                }
              }
            },
            [USER]: {
              type: 'integer',
              example: 3
            },
            updatedAt: {
              type: 'string',
              example: '2017-11-23T21:24:16.847Z'
            },
            createdAt: {
              type: 'string',
              example: '2017-11-23T21:24:16.847Z'
            }
          }
        }
      }
    }
  }
}, {
  protected: true
});
