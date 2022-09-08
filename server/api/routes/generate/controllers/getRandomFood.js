const { connectDatabase } = require('@kym/db');
const { FoodDesc } = connectDatabase();

const getRandomFood = async (req, res, next) => {
  try {
    const foods = await FoodDesc.scope('withAbbrev').findAll({
      where: {
        FdGrp_Cd: Math.floor((Math.random() * 10) + 1) * 100
      }
    });

    res.json({
      id: foods[Math.floor(Math.random() * foods.length)].abbrev_id,
      foodName: foods[Math.floor(Math.random() * foods.length)].Short_Desc
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getRandomFood;
