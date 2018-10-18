// update abbrevs set "photo"='salami.png' where "Main"='Salami';
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const { promisify } = require('util');
const bayes = require('./naive-bayes');

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
  try {
    // First try to get a saved version of the model
    const file = await readFileAsync('./pickled.json', 'utf8');
    model = bayes.fromJson(file);
  } catch (err) {
    // Couldn't get the model from file system
    model = bayes();
    await db.sequelize.sync();
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


  console.log(chalk.yellow('Ribeye'), groups[model.categorize('Ribeye')]);
  console.log(chalk.yellow('Steak, ground'), groups[model.categorize('Steak, ground')]);
  console.log(chalk.yellow('USDA'), groups[model.categorize('USDA')]);
  console.log(chalk.yellow('Apples'), groups[model.categorize('Apples')]);
  console.log(chalk.yellow('Tomatoes'), groups[model.categorize('Tomatoes')]);
  console.log(chalk.yellow('Milk'), groups[model.categorize('Milk')]);
  console.log(chalk.yellow('Salad'), groups[model.categorize('Salad')]);
  console.log(chalk.yellow('Seal'), groups[model.categorize('Seal')]);
  console.log(chalk.yellow('coffee Cream'), groups[model.categorize('coffee Cream')]);
  console.log(chalk.yellow('Chips'), groups[model.categorize('Chips')]);
  console.log(chalk.yellow('Salsa'), groups[model.categorize('Salsa')]);
  console.log(chalk.yellow('Rice'), groups[model.categorize('Rice')]);
  console.log(chalk.yellow('Chicken'), groups[model.categorize('Chicken')]);

  // const pickled = model.toJson();

  // fs.writeFileSync('pickled.json', pickled);

  process.exit();
}

execute();
