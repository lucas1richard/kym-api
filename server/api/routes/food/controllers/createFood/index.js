const {
  sequelize,
  Abbrev,
  AbbrevMicro,
  Weight,
  FoodDesc
} = include('/db');
const { handleRouteError } = include('utils/handleRouteError');
const { bodySchema } = require('./validation');
const cleanAbbrev = require('./cleaners/cleanAbbrev');
const cleanWeight = require('./cleaners/cleanWeight');
const cleanFoodDesc = require('./cleaners/cleanFoodDesc');

const createFood = async (req, res, next) => {
  let transaction;
  try {
    // Validate
    await bodySchema.validate(req.body);

    // use a transaction to ensure all succeed or all fail
    transaction = await sequelize.transaction();

    // Create a new abbrev
    const newAbbrev = await Abbrev.create(
      cleanAbbrev(req.body, res.locals.uuid),
      { transaction }
    );

    // Create a new weight
    const newWeight = await Weight.create(
      cleanWeight(req.body),
      { transaction }
    );

    // Associate the weight to the abbrev
    await newAbbrev.addWeight(
      newWeight,
      { transaction }
    );

    // Create a new foodDesc
    const newDesc = await FoodDesc.create(
      cleanFoodDesc(req.body),
      { transaction }
    );

    // Associate the foodDesc to the abbrev
    await newAbbrev.setFoodDesc(
      newDesc,
      { transaction }
    );

    // Create a new (empty) abbrevMicro
    const abbrevMicro = await AbbrevMicro.create(
      {},
      { transaction }
    );

    // Associate the abbrevMicro to the abbrev
    await newAbbrev.setAbbrevMicro(
      abbrevMicro,
      { transaction }
    );
    await transaction.commit();
    res.sendStatus(201);
  } catch (err) {
    if (transaction) {
      await transaction.rollback();
    }
    handleRouteError(err, 'Couldn\'t create the food');
    next(err);
  }
};


module.exports = createFood;
