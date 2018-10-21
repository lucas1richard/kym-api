const sequelize = require('../../../conn');

function syncAbbrevId() {
  return sequelize.models.abbrev.findOne({
    where: {
      NDB_No: this.NDB_No
    }
  })
    .then((abbrev) => {
      if (abbrev) {
        this.abbrevId = abbrev.id;
        return this.save();
      }
      return Promise.resolve();
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log(this.NDB_No, this.id, this.abbrevId);
    });
}

module.exports = syncAbbrevId;
