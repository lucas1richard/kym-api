const { connectDatabase } = require('@kym/db');
const { Program } = connectDatabase();
const { handleRouteError } = include('utils/handleRouteError');
const { bodySchema } = require('./validation');

const createProgram = async (req, res, next) => {
  try {
    await bodySchema.validate(req.body);

    const programObj = Program.makeProgramObject({
      ...req.body,
      uuid: res.locals.uuid,
    });
    const program = await Program.create(programObj);

    res.json(program);
  } catch (err) {
    handleRouteError(err, 'Couldn\'t create a program');
    next(err);
  }
};

module.exports = createProgram;
