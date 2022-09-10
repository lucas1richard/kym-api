const { Op } = require('@kym/db');

function makeFoodQuery(food) {
  if (!Array.isArray(food)) {
    return {};
  }
  if ((food.length === 1 && food[0] === '')) {
    return {};
  }
  return {
    [Op.and]: food.map((fd) => ({
      [Op.or]: [{
        Main: { [Op.iLike]: `%${fd}%` },
      }, {
        Sub: { [Op.iLike]: `%${fd}%` },
      }],
    })),
  };
}

module.exports = makeFoodQuery;
