const { connectDatabase } = require('@kym/db');
const { sequelize } = connectDatabase();

const carbs = '"abbrev"."carbohydrates"';
const fat = '"abbrev"."fat"';
const protein = '"abbrev"."protein"';

const noPercentError = new Error('The percent must be a number');
const noComparatorError = new Error('The comparator must be one of \'<\', \'>\', \'<=\', \'>=\', \'=\'');
const validComparators = ['<', '>', '<=', '>=', '='];

function isValidComparator(comparator) {
  return validComparators.reduce(comparatorsReduce, false);
  function comparatorsReduce(memo, option) {
    return memo || comparator === option;
  }
}

function makeSafePercent(percent) {
  let safePercent = percent;
  if (!percent) {
    safePercent = 0.001;
  }
  if (percent === 1) {
    safePercent = 0.999;
  }
  return safePercent;
}

/**
 * Creates the query for protein percent
 * @param {number} percent Percent protein
 * @param {string} comparator < or > or <= or >= or =
 */
function proteinQuery(percent, comparator) {
  if (typeof percent !== 'number') {
    throw noPercentError;
  }
  if (!isValidComparator(comparator)) {
    throw noComparatorError;
  }
  const safePercent = makeSafePercent(percent);
  return sequelize.where(
    sequelize.col('abbrev.protein'),
    comparator,
    sequelize.literal(`(((${safePercent * 4} * ${carbs}) + (${safePercent * 9} * ${fat}))/ (${4 - (safePercent * 4)}))`),
  );
}

/**
 * Creates the query for carbs percent
 * @param {number} percent Percent carbs
 * @param {string} comparator < or > or <= or >= or =
 */
function carbQuery(percent, comparator) {
  if (typeof percent !== 'number') {
    throw noPercentError;
  }
  if (!isValidComparator(comparator)) {
    throw noComparatorError;
  }
  const safePercent = makeSafePercent(percent);
  return sequelize.where(
    sequelize.col('abbrev.carbohydrates'),
    comparator,
    sequelize.literal(`(((${safePercent * 4} * ${protein}) + (${safePercent * 9} * ${fat}))/ (${4 - (safePercent * 4)}))`),
  );
}

/**
 * Creates the query for fat percent
 * @param {number} percent Percent fat
 * @param {string} comparator < or > or <= or >= or =
 */
function fatQuery(percent, comparator) {
  if (typeof percent !== 'number') {
    throw noPercentError;
  }
  if (!isValidComparator(comparator)) {
    throw noComparatorError;
  }
  const safePercent = makeSafePercent(percent);
  return sequelize.where(
    sequelize.col('abbrev.fat'),
    comparator,
    sequelize.literal(`(((${safePercent * 4} * ${protein}) + (${safePercent * 4} * ${carbs}))/ (${9 - (safePercent * 9)}))`),
  );
}

module.exports = {
  proteinQuery,
  carbQuery,
  fatQuery,
  carbs,
  fat,
  protein,
};
