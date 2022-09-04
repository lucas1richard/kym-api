const { connectDatabase } = require('@kym/db');
const { Abbrev } = connectDatabase();

const calculateFoodQuantities = async (req, res, next) => {
  try {
    const {
      proteinGoal,
      carbGoal,
      fatGoal,
    } = req.query;

    const result = await Abbrev.fpCalculateMacros({
      proteinGoal,
      carbGoal,
      fatGoal,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = calculateFoodQuantities;
