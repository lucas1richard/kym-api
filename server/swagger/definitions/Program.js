module.exports = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 1
    },
    startWeight: {
      type: 'string',
      example: "181"
    },
    endGoal: {
      type: 'string',
      example: "176"
    },
    endWeight: {
      type: 'string',
      example: "171"
    },
    startDate: {
      type: 'Date',
      example: "2017-10-24T04:00:00.000Z"
    },
    endDate: {
      type: 'Date',
      example: "2017-11-28T05:00:00.000Z"
    },
    status: {
      type: 'string',
      example: "In Progress"
    },
    result: {
      type: 'string',
      example: "TBD"
    },
    createdAt: {
      type: 'Date',
      example: "2017-10-24T18:47:05.407Z"
    },
    updatedAt: {
      type: 'Date',
      example: "2017-10-24T18:47:05.407Z"
    },
    user_id: {
      type: 'integer',
      example: 3
    }
  }
};
