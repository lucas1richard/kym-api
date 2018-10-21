const { handleRouteError } = include('utils/handleRouteError');
const {
  Abbrev,
  FoodDesc,
  Weight,
  sequelize
} = include('db');
const {
  foodnameSchema,
  offsetSchema
} = require('./validation');
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
    const rowsToSend = await Abbrev.scope().findAndCountAll({
      limit: 50,
      offset: offset * 50,
      distinct: true,
      where: query.makeWhere(),
      order: query.hasName ? sequelize.literal(`
        case
          when ("abbrev"."Main" ILIKE '${query.firstword}') then 'aaaa'
          when ("abbrev"."Main" ILIKE '${query.firstword} %') then 'aaaaa'
          when ("abbrev"."Main" ILIKE '${query.firstword}%') then 'aaaaaa'
          else "abbrev"."Main"
        end`)
        : [
          ['Main', 'desc'],
          ['Sub', 'desc']
        ],
      include: [FoodDesc, Weight]
    });

    res.json({
      // rows: rowsToSend,
      ...rowsToSend,
      query: req.params.foodname,
      offset: offset || 0
    });
  } catch (err) {
    handleRouteError(err, 'Couldn\'t get the foods');
    next(err);
  }
};

module.exports = getFoodByName;
