module.exports = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      foods: {
        type: 'array',
        items: {
          $ref: '#/definitions/Abbrev'
        }
      },
      macros: {
        type: 'object',
        properties: {
          protein: {
            description: 'The grams of protein supplied by the foods',
            type: 'number',
            example: 16.7,
           format: 'float'
          },
          carbs: {
            description: 'The grams of carbs supplied by the foods',
            type: 'number',
            example: 0,
            format: 'float'
          },
          fat: {
            description: 'The grams of fat supplied by the foods',
            type: 'number',
            example: 3.1,
            format: 'float'
          }
        }
      },
      weight: {
        type: 'object',
        properties: {
          gr: {
            description: 'The combined weight of the foods, in grams',
            type: 'number',
            example: 55,
            format: 'float'
          },
          oz: {
            description: 'The combined weight of the foods, in ounces',
            type: 'number',
            example: 1.9,
            format: 'float'
          }
        }
      }
    }
  }
};