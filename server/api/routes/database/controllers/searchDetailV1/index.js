const { connectDatabase, Op } = require('@kym/db');
const makeFoodQuery = require('./queries/food');
const makePercentQuery = require('./queries/percent');

const { Abbrev, sequelize } = connectDatabase();

const searchDetail = async ({ searchVal, proteinPer, carbsPer, fatPer }) => {
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

  const count = await Abbrev.count({ where });
  const rows = await Abbrev.findAll({
    where,
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

  return ({
    count,
    rows,
    query: searchVal,
    offset: 0,
  });
};

module.exports = searchDetail;
