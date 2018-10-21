const assert = require('assert');

module.exports = beforeCreate;

function beforeCreate(memo) {
  tr('train');
  tr('rest');

  function tr(param) {
    if (!memo.goals[param]) {
      throw new Error(`There must be goals for ${param}`);
    }
    if (memo.goals[param].length !== 6) {
      throw new Error(`There must be goals for six meals on a ${param} day`);
    }
    memo
      .goals[param]
      .forEach((item) => {
        assert.strictEqual(typeof item, 'object', 'Each goal must be a JSON object');
        ['protein', 'carbs', 'fat'].forEach((gl) => {
          assert.strictEqual(typeof item[gl], 'number', `There must be a value for ${gl}`);
        });
      });
  }
}
