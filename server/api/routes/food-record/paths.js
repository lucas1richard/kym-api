const swaggerPaths = include('swagger/swaggerPaths');

swaggerPaths.addPath('/food-record/{date}', {
  get: {
    summary: 'Gets the food records',
    tags: [
      'food-record'
    ],
    description: 'Returns an array of food records.',
    parameters: [{
      name: 'date',
      description: 'uri encoded date string',
      example: 'Nov 18 2017',
      in: 'path',
      required: true
    }],
    responses: {
      200: {
        description: 'A list of food records filtered by the date',
        schema: {
          type: 'array',
          items: {
            $ref: '#/definitions/FoodRecord'
          }
        }
      }
    }
  }
}, {
  protected: true
});


swaggerPaths.addPath('/food-record', {
  post: {
    summary: 'Adds a food record',
    tags: [
      'food-record'
    ],
    responses: {
      201: {
        description: swaggerPaths.httpStatus(201, 'A food record was created for the user'),
        schema: {
          $ref: '#/definitions/FoodRecord'
        }
      }
    },
    parameters: [{
      in: 'body',
      required: true,
      name: 'body',
      schema: {
        type: 'object',
        properties: {
          abbrev_id: {
            required: true,
            type: 'integer',
            example: 5470
          },
          date: {
            required: true,
            type: 'string',
            example: 'Sat Nov 18 2017'
          },
          meal: {
            required: true,
            type: 'integer',
            min: 1,
            max: 6,
            example: 1
          },
          quantity: {
            required: true,
            type: 'string',
            example: '1'
          },
          unit: {
            required: true,
            type: 'integer',
            example: 1
          }
        }
      }
    }]
  },
  delete: {
    description: 'Delete a food record',
    summary: 'Delete a food record based on the id',
    tags: [
      'food-record'
    ],
    responses: {
      204: {
        description: swaggerPaths.httpStatus(204, 'The record was successfully deleted')
      },
      404: {
        description: swaggerPaths.httpStatus(404, 'There is no record with the supplied id')
      }
    },
    parameters: [{
      name: 'body',
      required: true,
      in: 'body',
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
            example: 1539,
            required: true
          }
        }
      }
    }]
  }
}, {
  protected: true
});

swaggerPaths.addPath('/food-record/meal', {
  put: {
    description: 'Make a meal publically accessible',
    summary: 'Make a meal publically accessible',
    tags: [
      'food-record'
    ],
    parameters: [{
      name: 'body',
      in: 'body',
      required: true,
      schema: {
        type: 'object',
        properties: {
          id: {
            required: true,
            type: 'integer',
            example: 15
          }
        }
      }
    }],
    responses: {}
  }
}, {
  protected: true
});

swaggerPaths.addPath('/food-record/quantity/{id}', {
  put: {
    summary: 'Update a record quantity',
    tags: [
      'food-record'
    ],
    parameters: [{
      name: 'body',
      required: true,
      description: 'values to which to change',
      in: 'body',
      schema: {
        type: 'object',
        properties: {
          quantity: {
            type: 'string',
            example: '1.02'
          },
          seq: {
            type: 'string',
            example: '2'
          }
        }
      }
    }, {
      name: 'id',
      description: 'identifies the record',
      required: true,
      in: 'path',
      type: 'number'
    }],
    responses: {
      200: {
        description: swaggerPaths.httpStatus(200, 'Update successful'),
        $ref: '#/definitions/FoodRecord'
      },
      400: {
        description: swaggerPaths.httpStatus(400)
      },
      404: {
        description: swaggerPaths.httpStatus(404, 'Record not found')
      }
    }
  }
}, {
  protected: true
});

swaggerPaths.addPath('/food-record/{recordId}/{status}', {
  put: {
    description: 'Updates the record status to/from \'confirmed\'',
    summary: 'Update the record status',
    tags: [
      'food-record'
    ],
    responses: {
      200: {
        schema: {
          description: 'The updated food record',
          $ref: '#/definitions/FoodRecord'
        }
      }
    }
  }
}, {
  protected: true
});
