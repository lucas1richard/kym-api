const { connectDatabase, foreignKeys } = require('@kym/db');

const { Abbrev } = connectDatabase();
const { USER } = foreignKeys;

const getUserCreatedV1 = async ({ uuid }) => {
  const abbrevs = await Abbrev.scope('withAll').findAll({
    where: { [USER]: uuid },
    order: [['id', 'desc']],
  });

  return abbrevs;
};

module.exports = getUserCreatedV1;
