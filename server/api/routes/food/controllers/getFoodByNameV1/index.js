const { connectDatabase } = require('@kym/db');
const {
  Abbrev, FoodDesc, Weight, sequelize,
} = connectDatabase();
const makeWhere = require('./helpers/makeWhere');
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
  const [firstword] = splitname;

  // const count = await Abbrev.scope().count({ where });
  const rowsToSend = await Abbrev.findAndCountAll({
    limit: 50,
    offset: offset * 50 + 1,
    distinct: true,
    where: makeWhere(splitname),
    // eslint-disable-next-line no-extra-boolean-cast
    order: !!foodname
      ? sequelize.literal(`
      case
        when ("abbrev"."main" ILIKE '${firstword}') then 'aaaa'
        when ("abbrev"."main" ILIKE '${firstword} %') then 'aaaaa'
        when ("abbrev"."main" ILIKE '${firstword}%') then 'aaaaaa'
        else "abbrev"."main"
      end`)
      : [
          ['main', 'desc'],
          ['sub', 'desc'],
        ],
    include: [FoodDesc, Weight],
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
