/**
 * @param {{ mainGoal: number, secondaryGoal: number, minimalGoal: number }} goalDesc
 * @param {{ weight: number, p: number, c: number, f: number }} factor
 * @param {{ primary: ('p'|'c'|'f'), secondary: ('p'|'c'|'f'), minimal: ('p'|'c'|'f') }} macro
 * @returns {boolean}
 */
function checkFailure(goalDesc, factor, macro) {
  const {
    mainGoal,
    secondaryGoal,
    minimalGoal
  } = goalDesc;

  const {
    primary,
    secondary,
    minimal
  } = macro;

  const mainGoalRatio = mainGoal / (factor[primary] * (factor.weight / 100));

  const secondaryQuantity = factor[secondary] * mainGoalRatio;
  const minimalQuantity = factor[minimal] * mainGoalRatio;

  // If reaching the main goal causes the same food to exceed the secondary or
  // minimal goal, mark it as a failure.
  return (secondaryQuantity > secondaryGoal) || (minimalQuantity > minimalGoal);
}

module.exports = checkFailure;
