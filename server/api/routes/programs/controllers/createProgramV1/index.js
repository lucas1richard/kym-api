const { connectDatabase } = require('@kym/db');
const { Program } = connectDatabase();

const { bodySchema } = require('./validation');

const createProgramV1 = async ({ data, uuid }) => {
  await bodySchema.validate(data, { abortEarly: false });

  const programObj = Program.makeProgramObject({ ...data, uuid });
  const program = await Program.create(programObj);

  return {
    ...program.toJSON(),
    updatedAt: undefined,
    createdAt: undefined,
  };
};

module.exports = createProgramV1;
