const { USER } = include('db/foreignKeys');
const { Program } = include('db');

const getPrograms = async (req, res, next) => {
  try {
    const program = await Program.findOne({
      where: {
        [USER]: res.locals.uuid,
        status: 'In Progress'
      }
    });

    res.json(program);
  } catch (err) {
    next(err);
  }
};

module.exports = getPrograms;
