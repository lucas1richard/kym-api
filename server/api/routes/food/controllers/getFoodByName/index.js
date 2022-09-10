const { handleRouteError } = include('utils/handleRouteError');
const { connectDatabase } = require('@kym/db');
const {
  Abbrev, FoodDesc, Weight, sequelize,
} = connectDatabase();
const { foodnameSchema, offsetSchema } = require('./validation');
const Query = require('./helpers/Query');
const redisCounter = require('./redis/counter');

const getFoodByName = async (req, res, next) => {
  try {
    await foodnameSchema.validate(req.params.foodname);
    await offsetSchema.validate(req.query.offset);
    await redisCounter(req.params.foodname);

    // const food = req.params.foodname.split(' ');
    const query = new Query(req.params.foodname);
    const offset = parseInt(req.query.offset, 10) || 0;

    // const count = await Abbrev.scope().count({ where });
    const rowsToSend = await Abbrev.findAndCountAll({
      limit: 50,
      offset: offset * 50,
      distinct: true,
      where: query.makeWhere(),
      order: query.hasName
        ? sequelize.literal(`
        case
          when ("abbrev"."main" ILIKE '${query.firstword}') then 'aaaa'
          when ("abbrev"."main" ILIKE '${query.firstword} %') then 'aaaaa'
          when ("abbrev"."main" ILIKE '${query.firstword}%') then 'aaaaaa'
          else "abbrev"."main"
        end`)
        : [
            ['main', 'desc'],
            ['sub', 'desc'],
          ],
      include: [FoodDesc, Weight],
    });

    return res.json({
      // rows: rowsToSend,
      ...rowsToSend,
      query: req.params.foodname,
      offset: offset || 0,
    });
  } catch (err) {
    handleRouteError(err, 'Couldn\'t get the foods');
    next(err);
  }
};

module.exports = getFoodByName;
