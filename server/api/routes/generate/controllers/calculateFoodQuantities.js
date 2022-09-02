const { connectDatabase } = require('@kym/db');
const { Abbrev } = connectDatabase();

const calculateFoodQuantities = async (req, res, next) => {
  try {
    const {
      proteinGoal,
      carbGoal,
      fatGoal
    } = req.query;

    const params = {
      proteinGoal,
      carbGoal,
      fatGoal
    };

    const result = await Abbrev.fpCalculateMacros(params);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = calculateFoodQuantities;
