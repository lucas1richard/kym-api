const swaggerPaths = include('swagger/swaggerPaths');

swaggerPaths.addPath('/session/{token}', {
  get: {
    summary: 'Exhange the token for the user',
    tags: ['session'],
    parameters: [{
      name: 'token',
      in: 'path',
      description: 'The token',
    }],
    responses: {
      200: {
        $ref: '#/definitions/User',
      },
    },
  },
});

swaggerPaths.addPath('/session', {
  post: {
    tags: ['session'],
    parameters: [{
      description: 'The user chosen password',
      name: 'password',
      type: 'string',
      in: 'body',
    }, {
      description: 'The user chosen username',
      name: 'username',
      type: 'string',
      in: 'body',
    }],
    responses: {
      200: {
        schema: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'abc123xyz',
            },
          },
        },
      },
    },
  },
});
