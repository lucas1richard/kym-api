const { connectDatabase } = require('@kym/db');
const { USER } = require('@kym/db/dist/foreignKeys');
const { FoodRecord } = connectDatabase();
const { handleRouteError } = include('utils/handleRouteError');
const { bodySchema } = require('./validation');

const updateRecordStatus = async (req, res, next) => {
  try {
    // Validate
    await bodySchema.validate(req.body);

    const { ids, confirmed } = req.body;

    await FoodRecord.update({ confirmed }, { where: { id: ids, [USER]: res.locals.uuid } });

    res.sendStatus(204);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t update the record status');
    next(err);
  }
};

module.exports = updateRecordStatus;
