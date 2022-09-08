const { handleRouteError } = include('utils/handleRouteError');
const { connectDatabase } = require('@kym/db');
const { ABBREV } = require('@kym/db/dist/foreignKeys');
const { FoodRecord, Meal, Abbrev, Weight } = connectDatabase();
const { bodySchema } = require('./validation');

/**
 * Add a food record
 * {@link http://localhost:3000/api-docs/#/food-record/postapi_food_record}
 */
const addFoodRecord = async (req, res, next) => {
  try {
    const { uuid } = res.locals;
    // Validate
    await bodySchema.validate(
      req.body,
      { allowUnknown: true, abortEarly: false }
    );

    const createRecordArray = req.body.map(function addRecord(body) {
      return FoodRecord.createWithMeal({
        instance: {
          [ABBREV]: body.abbrevId,
          date: body.date,
          meal: body.meal,
          quantity: body.quantity,
          unit: body.unit,
          confirmed: body.confirmed,
          uuid,
        },
        Meal,
        Abbrev,
        Weight,
      });
    });

    // Create records
    const foods = await Promise.all(
      createRecordArray
    );

    // Send back to user
    res.status(201).json(foods);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t add the record');
    next(err);
  }
};

module.exports = addFoodRecord;
