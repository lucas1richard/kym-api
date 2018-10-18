module.exports = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 2
    },
    gender: {
      type: 'string',
      example: 'MALE'
    },
    height: {
      type: 'string',
      example: '73'
    },
    units: {
      type: 'string',
      example: 'imperial'
    },
    weight: {
      type: 'string',
      example: '181'
    },
    bodyfat: {
      type: 'string',
      example: null
    },
    lifestyle: {
      type: 'string',
      example: 'Normal'
    },
    goal: {
      type: 'string',
      example: null
    },
    createdAt: {
      type: 'string',
      example: '2017-10-24T18:47:05.321Z'
    },
    updatedAt: {
      type: 'string',
      example: '2017-10-24T18:47:05.321Z'
    },
    user_id: {
      type: 'integer',
      example: 3
    }
  }
};