module.exports = {
  type: 'object',
  properties: {
    protein: {
      type: 'number',
      format: 'float',
      example: 33.5
    },
    carbs: {
      type: 'number',
      format: 'float',
      example: 31.3
    },
    fat: {
      type: 'number',
      format: 'float',
      example: 14.9
    }
  }
};
