const { Program } = include('db');

const getPrograms = async (req, res, next) => {
  try {
    const program = await Program.findOne({
      where: {
        user_id: res.locals.user_id,
        status: 'In Progress'
      }
    });

    res.json(program);
  } catch (err) {
    next(err);
  }
};

module.exports = getPrograms;
