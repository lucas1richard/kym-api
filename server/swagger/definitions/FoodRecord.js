module.exports = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 1538
    },
    Date: {
      type: 'Date',
      example: '2017-11-17T05:00:00.000Z'
    },
    Meal: {
      type: 'integer',
      example: 1
    },
    Quantity: {
      type: 'numer',
      format: 'float',
      example: 1
    },
    Unit: {
      type: 'string',
      example: 'cup, pureed'
    },
    fromProgram: {
      type: 'boolean',
      example: true,
      default: true
    },
    confirmed: {
      type: 'boolean',
      example: true,
      default: true
    },
    createdAt: {
      type: 'Date',
      example: '2017-10-23T20:48:33.466Z'
    },
    updatedAt: {
      type: 'Date',
      example: '2017-10-23T20:48:33.466Z'
    },
    mealId: {
      type: 'integer',
      example: 619
    },
    abbrev_id: {
      type: 'integer',
      example: 5470
    },
    user_id: {
      type: 'integer',
      example: 3
    },
    abbrev: {
      $ref: '#/definitions/Abbrev' 
    },
    abbrevMicro: {
      $ref: '#/definitions/AbbrevMicro'
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
      type: 'integer',
      example: 276
    },
    Protein: {
      type: 'number',
      format: 'float',
      example: 5.1
    },
    Fat: {
      type: 'number',
      format: 'float',
      example: 23.1,
      format: 'int32'
    },
    Carbohydrates: {
      type: 'number',
      format: 'float',
      example: 18
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
      type: 'integer',
      example: 0,
      format: 'int32'
    },
    weights: {
      type: 'array',
      items: {
        $ref: '#definitions/Weight'
      }
    },
    Seq: {
      type: 'integer',
      example: 1
    },
    Gr: {
      type: 'integer',
      example: 230,
      format: 'int32'
    }
  }
};
