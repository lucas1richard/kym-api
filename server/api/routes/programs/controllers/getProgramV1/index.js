const { connectDatabase, foreignKeys } = require('@kym/db');
const { Program } = connectDatabase();

const getProgramsV1 = async ({ uuid, getAll }) => {
  const program = await Program[getAll ? 'findAll' : 'findOne']({
    where: {
      [foreignKeys.USER]: uuid,
      ...getAll ? { status: 'IN_PROGRESS' } : {},
    },
  });

  return program;
};

module.exports = getProgramsV1;
