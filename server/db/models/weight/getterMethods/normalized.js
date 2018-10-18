module.exports = normalized;

/**
 * Provide a more readable version of the instance
 * @return {{ val: number, txt: string }}
 * @this weight (instance)
 */
function normalized() {
  return {
    val: this.Seq,
    txt: `${this.Description} (${Math.round((this.Gr_Wgt / this.Amount) * 10) / 10} g)`,
    weight: Math.round((this.Gr_Wgt / this.Amount) * 10) / 10
  };
}
