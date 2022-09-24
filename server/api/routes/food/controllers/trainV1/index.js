const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const bayes = require('../../../../../NaiveBayes');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const getRandom = require('../getRandomV1');
const addPreference = require('../addPreferenceV1');

/* istanbul ignore next */
async function trainV1(uuid, food, like) {
  if (like !== 'like' && like !== 'dislike') {
    throw new Error('like should be `like` or `dislike`');
  }
  const pickledPath = path.resolve(__dirname, '..', '..', '..', '..', '..', 'bayes-models', `${uuid}.json`);
  let model;
  try {
    const file = await readFileAsync(pickledPath, 'utf8');
    model = bayes.fromJson(file);
  } catch (err) {
    model = bayes();
  }
  model.learn(food.longname, like);

  try {
    await addPreference(uuid, food.id, like);
  } catch (err) {
    console.error(err);
  }

  const pickled = model.toJson();
  await writeFileAsync(pickledPath, pickled);
  const randomFood = await getRandom();
  const guess = model.categorize(`${randomFood.longname} ${randomFood.foodDesc.FdGrp_Cd}`);

  return {
    randomFood,
    guess,
  };
}

module.exports = trainV1;
