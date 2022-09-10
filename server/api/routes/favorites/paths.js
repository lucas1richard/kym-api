const swaggerPaths = include('swagger/swaggerPaths');
const AbbrevDef = include('swagger/definitions/Abbrev');

swaggerPaths.addPath('/favorites/foods', {
  get: {
    tags: ['favorites'],
    summary: 'Get a user\'s favorites',
    responses: {
      200: {
        description: swaggerPaths.httpStatus(200, 'A list of the favorites'),
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: Object.assign({}, AbbrevDef.properties, {
              recordFavorite: {
                type: 'object',
                properties: {
                  abbrevId: {
                    type: 'integer',
                    example: 2160,
                  },
                  createdAt: {
                    type: 'string',
                    example: '2017-11-26T02:11:40.536Z',
                  },
                  meal: {
                    type: 'integer',
                    example: 1,
                  },
                  updatedAt: {
                    type: 'string',
                    example: '2017-11-26T02:11:40.536Z',
                  },
                  userId: {
                    type: 'integer',
                    example: 3,
                  },
                },
              },
            }),
          },
        },
      },
    },
  },
  post: {
    tags: ['favorites'],
    summary: 'Add food as a favorite',
    parameters: [{
      name: 'body',
      in: 'body',
      schema: {
        type: 'object',
        properties: {
          abbrevId: {
            type: 'integer',
            example: 1,
          },
          userId: {
            type: 'integer',
            example: 3,
          },
          meal: {
            type: 'integer',
            example: 1549,
          },
        },
      },
    }],
  },
  delete: {
    tags: ['favorites'],
    summary: 'Remove a favorite food',
    parameters: [{
      name: 'body',
      in: 'body',
      required: true,
      schema: {
        type: 'object',
        properties: {
          abbrevId: {
            type: 'integer',
            example: 8778,
          },
          meal: {
            type: 'integer',
            example: 1,
          },
        },
      },
    }],
    responses: {
      204: {
        description: swaggerPaths.httpStatus(204, 'Favorite food deleted'),
      },
    },
  },
}, {
  protected: true,
});
