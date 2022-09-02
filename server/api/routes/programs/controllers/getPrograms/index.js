const { connectDatabase, foreignKeys } = require('@kym/db');
const { Program } = connectDatabase();

const getPrograms = async (req, res, next) => {
  try {
    const program = await Program.findAll({
      where: {
        [foreignKeys.USER]: res.locals.uuid
      }
    });

    res.json(program);
  } catch (err) {
    next(err);
  }
};

module.exports = getPrograms;
