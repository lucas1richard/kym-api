// update abbrevs set "photo"='salami.png' where "Main"='Salami';
const logger = require('./utils/logger');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const { promisify } = require('util');
const bayes = require('./NaiveBayes');

const foodGroups = require('./db/data/fd-group');

const groups = foodGroups.reduce((memo, item) => {
  let groupId = item.GroupID;
  if (item.GroupID.charAt(0) === '0') {
    groupId = item.GroupID.slice(1);
  }
  return {
    ...memo,
    [groupId]: item.Description
  };
}, {});

global.base_dir = path.resolve(__dirname);
global.abs_path = (pth) => global.base_dir + pth;
// eslint-disable-next-line import/no-dynamic-require
global.include = (file) => require(global.abs_path(`/${file}`));

const db = require('./db');

const readFileAsync = promisify(fs.readFile);

async function execute() {
  let model;
  let hasFile = false;
  try {
    // First try to get a saved version of the model
    const file = await readFileAsync('./pickled.json', 'utf8');
    model = bayes.fromJson(file);
    hasFile = true;
  } catch (err) {
    // Couldn't get the model from file system
    model = bayes();
    await db.sequelize.sync({ logging: false });
    const allAbbrevs = await db.Abbrev.findAll();

    // Train the newly created model
    allAbbrevs.forEach((abbrev) => {
      const { foodDesc } = abbrev;
      if (!foodDesc) return;
      const { Long_Desc, FdGrp_Cd } = foodDesc;
      if (!Long_Desc) return;
      if (!FdGrp_Cd) return;

      model.learn(Long_Desc, FdGrp_Cd);
    });
  }

  const terms = [
    'Ribeye',
    'steak, round',
    'usda',
    'apples',
    'apple',
    'apple granny',
    'apple sauce',
    'tomatoes',
    'tomato',
    'milk',
    'salads',
    'salad',
    'seal',
    'coffee cream',
    'chips',
    'salsa',
    'rice',
    'chicken',
    'olive',
    'olives',
  ]

  terms.forEach((term) => {
    const groupKey = model.categorize(term);
    logger.debug(`${chalk.yellow(term)}, [${chalk.magenta(groupKey)}], ${chalk.gray(groups[groupKey])}`);
  });

  if (!hasFile) {
    const pickled = model.toJson();
  
    fs.writeFileSync('pickled.json', pickled);
  }

  process.exit();
}

execute();
