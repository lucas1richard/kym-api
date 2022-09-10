const { connectDatabase, foreignKeys } = require('@kym/db');
const { Program } = connectDatabase();

const getPrograms = async (req, res, next) => {
  try {
    const program = await Program.findOne({
      where: {
        [foreignKeys.USER]: res.locals.uuid,
        status: 'IN_PROGRESS',
      },
    });

    res.json(program);
  } catch (err) {
    next(err);
  }
};

module.exports = getPrograms;
