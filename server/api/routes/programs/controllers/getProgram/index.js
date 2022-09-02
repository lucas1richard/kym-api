const { connectDatabase, foreignKeys } = require('@kym/db');
const { Program } = connectDatabase();

const getPrograms = async (req, res, next) => {
  try {
    const program = await Program.findOne({
      where: {
        [foreignKeys.USER]: res.locals.uuid,
        status: 'In Progress'
      }
    });

    res.json(program);
  } catch (err) {
    next(err);
  }
};

module.exports = getPrograms;
