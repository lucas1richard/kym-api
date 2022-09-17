const { connectDatabase } = require('@kym/db');
const cleanAbbrev = require('./cleaners/cleanAbbrev');
const cleanWeight = require('./cleaners/cleanWeight');
const cleanFoodDesc = require('./cleaners/cleanFoodDesc');

const {
  sequelize,
  Abbrev,
  AbbrevMicro,
  Weight,
  FoodDesc,
} = connectDatabase();

const createFoodV1 = async ({ data, uuid }) => {
  let transaction;
  try {
    // use a transaction to ensure all succeed or all fail
    transaction = await sequelize.transaction();

    // Create a new abbrev
    const newAbbrev = await Abbrev.create(cleanAbbrev(data, uuid), { transaction });

    // Create a new weight
    const newWeight = await Weight.create(cleanWeight(data), { transaction });

    // Associate the weight to the abbrev
    await newAbbrev.addWeight(newWeight, { transaction });

    // Create a new foodDesc
    const newDesc = await FoodDesc.create(cleanFoodDesc(data), { transaction });

    // Associate the foodDesc to the abbrev
    await newAbbrev.setFoodDesc(newDesc, { transaction });

    // Create a new (empty) abbrevMicro
    const abbrevMicro = await AbbrevMicro.create({}, { transaction });

    // Associate the abbrevMicro to the abbrev
    await newAbbrev.setAbbrevMicro(abbrevMicro, { transaction });

    await transaction.commit();

    return newAbbrev;
  } catch (err) {
    await transaction.rollback();
  }
};

module.exports = createFoodV1;
