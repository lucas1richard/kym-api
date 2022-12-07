const { connectDatabase, Op } = require('@kym/db');
const makeFoodQuery = require('./queries/food');
const makePercentQuery = require('./queries/percent');
const { bodySchema } = require('./validation');

const { Abbrev, sequelize } = connectDatabase();

const searchDetail = async (data) => {
  await bodySchema.validate(data, { abortEarly: false, allowUnknown: true });

  const { searchVal, proteinPer, carbsPer, fatPer, offset = 0 } = data;

  const food = searchVal ? searchVal.split(' ') : null;
  let foodQuery = {
    main: {
      [Op.ne]: '',
    },
  };

  if (food) {
    foodQuery = makeFoodQuery(food);
  }

  const where = {
    ...foodQuery,
    ...makePercentQuery({ proteinPer, carbsPer, fatPer }),
  };

  const rowsToSend = await Abbrev.scope('withFoodGroup', 'withWeight').findAndCountAll({
    where,
    offset: offset * 50,
    order: food
      ? sequelize.literal(`
      case
        when ("abbrev"."main" ILIKE '${food[0]}') then 'aaaa'
        when ("abbrev"."main" ILIKE '${food[0]} %') then 'aaaaa'
        when ("abbrev"."main" ILIKE '${food[0]}%') then 'aaaaaa'
        else "abbrev"."main"
      end`)
      : [
          ['main', 'desc'],
          ['sub', 'desc'],
        ],
    limit: 50,
  });

  const abbrevs = Object.fromEntries(
    rowsToSend.rows.map((abbrev) => [abbrev.get('id'), abbrev.toJSON()]),
  );

  return ({
    count: rowsToSend.rows.length,
    totalCount: rowsToSend.count,
    query: searchVal,
    offset,
    abbrevs,
  });
};

module.exports = searchDetail;
