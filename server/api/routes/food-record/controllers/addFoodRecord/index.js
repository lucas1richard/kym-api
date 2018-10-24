const { handleRouteError } = include('utils/handleRouteError');
const { FoodRecord } = include('db');
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
      { allowUnknown: true }
    );

    const createRecordArray = req.body.map(function addRecord(body) {
      return FoodRecord.createWithMeal({
        ...body,
        uuid
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
