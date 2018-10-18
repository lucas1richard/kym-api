/**
 * @module models/food-des/classMethods/bestFoodGroup
 */

// const assert = require('assert');

module.exports = getBestGroup;

/**
 * Determine the best food group for a food string
 * @this food-des
 * @return {{ name: string, group: string, err: string }}
 */
function getBestGroup(foods) {
  // assert.equal(typeof food, 'string', 'Food should be a string');
  // assert(food.length > 0, 'Food cannot be an empty string');

  // const errorMsg = {
  //   name: 'No group found',
  //   group: '0000',
  //   err: 'NO_GROUP_FOUND'
  // };

  /** If there are no similar foods, say that there are none */
  if (!foods.length) {
    throw new Error('No similar foods found');
  }

  /** keys are descriptions */
  const countHash = {};
  foods.forEach((indFood) => {
    const { foodGroup: { Description } } = indFood;
    if (!countHash[Description]) {
      countHash[Description] = {
        group: indFood.FdGrp_Cd,
        count: 1
      };
    } else {
      countHash[Description].count += 1;
    }
  });

  const countHashVals = Object.keys(countHash).map((key) => countHash[key]);
  const maxCount = Math.max.apply(null, countHashVals.map((obj) => obj.count));
  const chosenGroup = Object.keys(countHash).filter((key) => countHash[key].count === maxCount)[0];

  /** Just in case */
  if (!chosenGroup) {
    throw new Error('No group found');
  }

  return {
    name: chosenGroup,
    group: countHash[chosenGroup].group,
  };
}
