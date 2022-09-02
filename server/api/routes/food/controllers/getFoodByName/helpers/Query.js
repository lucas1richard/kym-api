const { connectDatabase } = require('@kym/db');
const { sequelize } = connectDatabase();
const { Op } = sequelize;

class Query {
  constructor(rawName) {
    this.rawName = rawName;
    this.splitName = rawName.split(' ');
    [this.firstword] = this.rawName.split(' ');
  }

  get hasName() {
    return this.rawName && Array.isArray(this.splitName);
  }

  makeWhere() {
    if (!this.hasName) {
      return {};
    }
    return {
      [Op.and]: this.splitName.map((fd) => ({
        [Op.or]: [
          { Main: { [Op.iLike]: `%${fd}%` } },
          { Sub: { [Op.iLike]: `%${fd}%` } }
        ],
      }))
    };
  }
}

module.exports = Query;
