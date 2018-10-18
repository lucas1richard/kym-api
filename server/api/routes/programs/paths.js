const swaggerPaths = include('swagger/swaggerPaths');

swaggerPaths.addPath('/programs', {
  get: {
    description: 'Get a program',
    summary: 'Get a program',
    tags: ['programs'],
    responses: {
      200: {
        $ref: '#/definitions/Program'
      }
    }
  },
  post: {
    description: 'Create a program',
    summary: 'Create a program',
    tags: ['programs'],
    parameters: [{
      name: 'body',
      required: true,
      in: 'body',
      schema: {
        type: 'object',
        properties: {
          weight: {
            type: 'string',
            example: '181.2'
          },
          units: {
            type: 'string',
            example: 'imperial'
          }
        }
      }
    }],
    responses: {
      200: {
        $ref: '#/definitions/Program'
      }
    }
  }
}, {
  protected: true
});
