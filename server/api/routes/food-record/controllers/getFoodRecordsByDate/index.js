const { connectDatabase } = require('@kym/db');
const { FoodRecord } = connectDatabase();
const { handleRouteError } = include('utils/handleRouteError');
const {
  dateSchema,
  userIdSchema
} = require('./validation');

/**
 * {@link http://localhost:3000/api-docs/#/food-record/get_api_food_record__date_}
 */
const getFoodRecordsByDate = async (req, res, next) => {
  try {
    // Validate
    await dateSchema.validate(req.params.date);
    await userIdSchema.validate(res.locals.uuid);

    const rawRecords = await FoodRecord.findByDate(
      req.params.date,
      res.locals.uuid
    );

    const records = await Promise.all(rawRecords.map((record) => {
      return record.calMacros();
    }));
    
    res.json(records);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t get the records');
    next(err);
  }
};

module.exports = getFoodRecordsByDate;
