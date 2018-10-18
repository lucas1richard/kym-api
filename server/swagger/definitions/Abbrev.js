module.exports = {
  type: 'object',
  properties: {
    longname: {
      type: 'string',
      example: 'Avocados, raw, Florida'
    },
    maxMacro: {
      type: 'string',
      example: 'Fat',
      enum: ['Protein', 'Carbohydrates', 'Fat']
    },
    id: {
      type: 'integer',
      example: 5470,
      format: 'int32'
    },
    Main: {
      type: 'string',
      example: 'Avocados'
    },
    Sub: {
      type: 'string',
      example: 'raw, Florida'
    },
    Calories: {
      type: 'string',
      example: '120'
    },
    Protein: {
      type: 'string',
      example: '2.23'
    },
    Fat: {
      type: 'string',
      example: '10.06'
    },
    Carbohydrates: {
      type: 'string',
      example: '7.82'
    },
    GmWt_1: {
      type: 'string',
      example: '230'
    },
    GmWt_Desc1: {
      type: 'string',
      example: '1 cup, pureed'
    },
    GmWt_2: {
      type: 'string',
      example: '304'
    },
    GmWt_Desc2: {
      type: 'string',
      example: '1 fruit, without skin and seeds'
    },
    UserID: {
      type: 'number',
      example: 0
    },
    // abbrevMicro: {
    //   $ref: '#/definitions/AbbrevMicro'
    // },
    createdAt: {
      type: 'string',
      example: '2017-10-23T20:48:33.466Z'
    },
    updatedAt: {
      type: 'string',
      example: '2017-10-23T20:48:33.466Z'
    },
    weights: {
      type: 'array',
      items: {
        $ref: '#/definitions/Weight'
      }
    }
  }
};
