const { FoodDesc, Abbrev } = include('db');

const getRandomFood = async (req, res, next) => {
  try {
    const foods = await FoodDesc.findAll({
      where: {
        FdGrp_Cd: Math.floor((Math.random() * 10) + 1) * 100
      },
      include: [Abbrev]
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
