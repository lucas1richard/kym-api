const { connectDatabase, Op } = require('@kym/db');
const {
  Abbrev, FoodDesc, Weight,
} = connectDatabase();
const redisCounter = require('./redis/counter');

/**
 * Gets the foods whose `main` contains `foodname`
 * @param {object} param0
 * @param {string} param0.foodname make sure to trim any empty spaces `foodname.trim()`
 * @param {number} param0.offset make sure to trim any empty spaces `foodname.trim()`
 */
const getFoodByNameV1 = async ({ foodname, offset = 0 }) => {
  await redisCounter(foodname);

  const splitname = foodname.split(' ');

  const rowsToSend = await Abbrev.findAndCountAll({
    limit: 50,
    offset: offset * 50 + 1,
    distinct: true,
    include: [
      {
        model: FoodDesc,
        where: {
          [Op.and]: splitname.map((fd) => ({ Long_Desc: { [Op.iLike]: `%${fd}%` } })),
        },
      },
      Weight,
    ],
  });

  const abbrevs = Object.fromEntries(
    rowsToSend.rows.map((abbrev) => [abbrev.get('id'), abbrev.toJSON()]),
  );

  return {
    count: rowsToSend.rows.length,
    totalCount: rowsToSend.count,
    query: foodname,
    offset,
    abbrevs,
  };
};

module.exports = getFoodByNameV1;
