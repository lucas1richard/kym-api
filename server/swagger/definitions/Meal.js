module.exports = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 15,
      format: 'int32'
    },
    date: {
      type: 'Date',
      example: '2017-11-17T05:00:00.000Z'
    },
    meal: {
      type: 'integer',
      example: 1,
      minimum: 1,
      maximum: 6,
      format: 'int32'
    },
    public: {
      type: 'boolean',
      default: false
    },
    postWorkout: {
      type: 'boolean',
      default: false
    },
    createdAt: {
      type: 'Date',
      example: '2017-11-18T03:36:26.984Z'
  },
    updatedAt: {
      type: 'Date',
      example: '2017-11-18T03:36:26.984Z'
    },
    user_id: {
      type: 'integer',
      example: 3,
      format: 'int32'
    }
  }
};
