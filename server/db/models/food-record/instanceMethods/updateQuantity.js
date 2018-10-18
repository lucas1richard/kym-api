module.exports = updateQuantity;

/**
 * Revise the quantity of a record
 * @param {Object} quant
 * @param {number} quant.quantity
 * @param {string} quant.seq
 * @return {Promise}
 * @this foodRecord (instance)
 */
function updateQuantity({ quantity, seq }) {
  this.Quantity = quantity;
  this.Unit = seq;
  return this.save();
}
