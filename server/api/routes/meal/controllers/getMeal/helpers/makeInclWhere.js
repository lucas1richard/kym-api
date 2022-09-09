const { Op } = require('@kym/db');

/**
 * Make include where object
 * @param {string} keyword
 */
function makeInclWhere(keyword = '') {
  return {
    [Op.and]: keyword.split(' ').map((fd) => {
      const searchTerm = `%${fd}%`;
      const likeTerm = {
        [Op.iLike]: searchTerm
      };

      return ({
        [Op.or]: [{
          main: likeTerm
        }, {
          sub: likeTerm
        }]
      });
    })
  };
}

module.exports = makeInclWhere;
