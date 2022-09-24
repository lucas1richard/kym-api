const { connectDatabase, foreignKeys } = require('@kym/db');

const AppError = include('configure/appError');

const { Abbrev } = connectDatabase();

const deleteFoodV1 = async ({ uuid, id }) => {
  const abbrev = await Abbrev.findByPk(id);
  if (!abbrev) {
    throw new AppError(404, {
      devmessage: 'ABBREV_NOT_FOUND',
      usermessage: 'Couldn\'t delete a food which was created by another user',
    }, true);
  }

  if (abbrev.get(foreignKeys.USER) !== uuid) {
    throw new AppError(401, {
      devmessage: 'INVALID_DELETION_OWNER',
      usermessage: 'Couldn\'t delete a food which was created by another user',
    }, true);
  }
  await abbrev.destroy();
};

module.exports = deleteFoodV1;
