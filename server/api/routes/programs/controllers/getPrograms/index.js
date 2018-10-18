const { Program } = include('db');

const getPrograms = async (req, res, next) => {
  try {
    const program = await Program.findAll({
      where: {
        user_id: res.locals.user_id
      }
    });

    res.json(program);
  } catch (err) {
    next(err);
  }
};

module.exports = getPrograms;
