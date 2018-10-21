const { USER } = include('db/foreignKeys');

module.exports = makeProgramObject;

/**
 * Create an object to define a program
 * @param {{ units: string, weight: number, uuid: number, goal: 'Lose Weight'|'Maintain'|'Gain Muscle' }} measure
 */
function makeProgramObject(measure) {
  console.log(measure);
  const { units, weight, goal, uuid } = measure;
  const startWeight = weight * 1;
  let endGoal;
  let poundsToLose = 0;
  if (goal && goal.toLowerCase() === 'lose weight') {
    poundsToLose = 5;
  }
  if (goal && goal.toLowerCase() === 'gain muscle') {
    poundsToLose = -5;
  }
  if (units === 'imperial') {
    endGoal = parseFloat(weight) - poundsToLose;
  } else {
    endGoal = Math.round((parseFloat(weight) - (poundsToLose / 2.2)) * 10) / 10;
  }
  const startDate = new Date();
  const endDate = new Date(new Date().getTime() + (86400000 * 35));

  return {
    startWeight,
    endGoal,
    startDate,
    endDate,
    status: 'In Progress',
    [USER]: uuid,
    result: 'TBD'
  };
}
