module.exports = longname;

/** Combine the `Main` and `Sub` parameters
 * @this abbrev
 * @return string
 */
function longname() {
  return `${this.Main}, ${this.Sub}`;
}
