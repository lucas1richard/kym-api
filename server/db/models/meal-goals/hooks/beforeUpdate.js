module.exports = beforeUpdate;

function beforeUpdate() {
  throw new Error('Goals cannot be modified. Create new goals instead.');
}
