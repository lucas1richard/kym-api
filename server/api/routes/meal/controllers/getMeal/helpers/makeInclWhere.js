const { sequelize } = include('db');
const { Op } = sequelize;

/**
 * Make include where object
 * @param {string} keyword
 */
function makeInclWhere(keyword) {
  const inclWhere = {};
  if (keyword) {
    Object.assign(inclWhere, {
      [Op.and]: keyword.split(' ').map((fd) => {
        const searchTerm = `%${fd}%`;
        const likeTerm = {
          [Op.iLike]: searchTerm
        };

        return ({
          [Op.or]: [{
            Main: likeTerm
          }, {
            Sub: likeTerm
          }]
        });
      })
    });
  }
  return inclWhere;
}

module.exports = makeInclWhere;
