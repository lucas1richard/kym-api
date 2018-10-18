const swaggerPaths = include('swagger/swaggerPaths');

swaggerPaths.addPath('/foodmicro/{id}', {
  get: {
    tags: ['foodmicro'],
    parameters: [{
      name: 'id',
      in: 'path',
      type: 'number'
    }]
  }
}, {
  protected: true
});
