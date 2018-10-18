module.exports = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 3
    },
    firstname: {
      type: 'string',
      example: 'Richard'
    },
    lastname: {
      type: 'string',
      example: 'Lucas'
    },
    username: {
      type: 'string',
      example: null
    },
    email: {
      type: 'string',
      example: null
    },
    password: {
      type: 'string',
      example: 'abcxyz123'
    },
    birthdate: {
      type: 'string',
      example: '1989-06-02T04:00:00.000Z'
    },
    googleId: {
      type: 'string',
      example: null
    },
    fitbitId: {
      type: 'string',
      example: 'ABCXYZ'
    },
    fitbitToken: {
      type: 'string',
      example: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1U0NLUE0iLCJhdWQiOiIyMjhQUUYiLCJp'
    },
    fitbitRefreshToken: {
      type: 'string',
      example: '21467a3d0fb7c9cc502db2a015b24c58cf140b51249a77e59c2b6702028fa312'
    },
    createdAt: {
      type: 'string',
      example: '2017-10-24T18:47:04.836Z'
    },
    updatedAt: {
      type: 'string',
      example: '2017-11-23T21:57:57.409Z'
    },
    programs: {
      type: 'array',
      items: {
        $ref: '#/definitions/Program'
      }
    },
    mealGoals: {
      type: 'array',
      items: {
        schema: {
          type: 'object',
          properties: {
            train: {
              $ref: '#/definitions/Goal'
            },
            rest: {
              $ref: '#/definitions/Goal'
            }
          }
        }
      }
    },
    createdAt: {
      type: 'string',
      example: '2017-10-24T18:47:13.782Z'
    },
    updatedAt: {
      type: 'string',
      example: '2017-10-24T18:47:13.782Z'
    },
    user_id: {
      type: 'integer',
      example: 3
    },
    userMeasurements: {
      type: 'array',
      items: {
        $ref: '#/definitions/Measurement'
      }
    }
  }
};
