const { Op } = require('@kym/db');

const makeWhere = (splitname) => {
  if (!splitname) return {};
  return {
    [Op.and]: splitname.map((fd) => ({
      [Op.or]: [
        { main: { [Op.iLike]: `%${fd}%` } },
        { sub: { [Op.iLike]: `%${fd}%` } },
      ],
    })),
  };
};

module.exports = makeWhere;
