module.exports = {
  type: 'object',
  properties: {
    normalized: {
      type: 'object',
      properties: {
        val: {
          type: 'number',
          example: 1,
          format: 'float'
        },
        txt: {
          type: 'string',
          example: 'cup, pureed (230 g)'
        }
      }
    },
    id: {
      type: 'integer',
      example: 5725,
      format: 'int32'
    },
    Seq: {
      type: 'integer',
      example: 1,
      format: 'int32'
    },
    Amount: {
      type: 'string',
      example: '1.00'
    },
    Description: {
      type: 'string',
      example: 'cup, pureed'
    },
    Gr_Wgt: {
      type: 'string',
      example: '230.00'
    },
    createdAt: {
      type: 'Date',
      example: '2017-10-23T20:48:57.803Z'
    },
    updatedAt: {
      type: 'Date',
      example: '2017-10-23T20:48:57.803Z'
    },
    abbrev_id: {
      type: 'integer',
      example: 5470,
      format: 'int32'
    }
  }
}