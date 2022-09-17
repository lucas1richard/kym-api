const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const bayes = require('../../../../../NaiveBayes');

const readFileAsync = promisify(fs.readFile);

/* istanbul ignore next */
async function assessV1(uuid, foodName) {
  let model;

  try {
    const pickledPath = path.resolve(__dirname, '..', '..', '..', '..', '..', 'bayes-models', `${uuid}.json`);
    const file = await readFileAsync(pickledPath, 'utf8');
    model = bayes.fromJson(file);
    const data = model.categorize(foodName);
    return {
      status: 'success',
      guess: data,
    };
  } catch (err) {
    return {
      status: 'fail',
      error: err,
    };
  }
}

module.exports = assessV1;
