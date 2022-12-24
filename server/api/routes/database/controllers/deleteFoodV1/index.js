const { AbbrevApi } = require('@kym/db');

const deleteFoodV1 = async ({ uuid, id }) => {
  await AbbrevApi.deleteAbbrev({ uuid, id });
};

module.exports = deleteFoodV1;
