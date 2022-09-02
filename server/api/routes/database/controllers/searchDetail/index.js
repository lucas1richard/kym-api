const { connectDatabase } = require('@kym/db');
const makeFoodQuery = require('./queries/food');
const makePercentQuery = require('./queries/percent');
const { bodySchema } = require('./validation');

const { Abbrev, sequelize } = connectDatabase();

const { Op } = sequelize;

const searchDetail = async (req, res, next) => {
  try {
    // Validate
    await bodySchema.validate(req.body, { allowUnknown: true });
    const food = req.body.searchVal ? req.body.searchVal.split(' ') : null;
    let foodQuery = {
      Main: {
        [Op.ne]: ''
      }
    };

    if (food) {
      foodQuery = makeFoodQuery(food);
    }

    const where = Object.assign({}, foodQuery, makePercentQuery(req.body)
    );

    const count = await Abbrev.scope().count({ where });
    const rows = await Abbrev.findAll({ where,
      order: food ? sequelize.literal(`
        case
          when ("abbrev"."Main" ILIKE '${food[0]}') then 'aaaa'
          when ("abbrev"."Main" ILIKE '${food[0]} %') then 'aaaaa'
          when ("abbrev"."Main" ILIKE '${food[0]}%') then 'aaaaaa'
          else "abbrev"."Main"
        end`)
        : [
          ['Main', 'desc'],
          ['Sub', 'desc']
        ],
      limit: 50
    });

    res.json({
      count,
      rows,
      query: req.body.searchVal,
      offset: 0
    });
  } catch (err) {
    // if (err.isJoi) {
    //   err.toSend = {
    //     message: err.message,
    //     devmessage: AppError.getMessage(err),
    //     usermessage: 'Couldn\'t get food detail'
    //   };
    // }
    next(err);
  }
};


module.exports = searchDetail;
