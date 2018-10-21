const { USER } = include('db/foreignKeys');
const { Program } = include('db');

const getPrograms = async (req, res, next) => {
  try {
    const program = await Program.findAll({
      where: {
        [USER]: res.locals.uuid
      }
    });

    res.json(program);
  } catch (err) {
    next(err);
  }
};

module.exports = getPrograms;
