// update abbrevs set "photo"='salami.png' where "Main"='Salami';
const path = require('path');
// const fs = require('fs');

global.base_dir = path.resolve(__dirname, '..', '..');
global.abs_path = (pth) => global.base_dir + pth;
// eslint-disable-next-line import/no-dynamic-require
global.include = (file) => require(global.abs_path(`/${file}`));

const db = require('../index');
const chalk = require('chalk');
// const filteredMeals = require('../data/filteredmeals');

// const allFoodsArray = filteredMeals.reduce((accum, meal) => {
//   return accum.concat(meal);
// }, []);

// let maxFoodId = 0;
// let maxWeightId = 0;
// const allFoodsHash = {};
// const allWeightsHash = {};

// allFoodsArray.forEach((food) => {
//   food.forEach((item) => {
//     if (allFoodsHash[item.id]) {
//       return;
//     }
//     allFoodsHash[item.id] = item;
//     if (item.id > maxFoodId) {
//       maxFoodId = item.id;
//     }
//     item.weights.forEach((weight) => {
//       if (allWeightsHash[weight.id]) {
//         return;
//       }
//       if (weight.id > maxWeightId) {
//         maxWeightId = weight.id;
//       }
//       allWeightsHash[weight.id] = weight;
//     });
//   });
// });


// async function seedFilteredMeals() {
//   await db.sequelize.sync();
//   // console.log(chalk.yellow('All Weights Length'));
//   // console.log(Object.values(allWeightsHash).length);
//   // console.log(chalk.yellow('Max Weight Id'));
//   // console.log(maxWeightId);
//   // console.log(chalk.yellow('All Foods Length'));
//   // console.log(Object.values(allFoodsHash).length);
//   // console.log(chalk.yellow('Max Food Id'));
//   // console.log(maxFoodId);
//   // console.log(chalk.yellow('A Sample Food'));
//   // console.log(Object.values(allFoodsHash)[0]);
//   const getAbbrevs = Promise.all(
//     Object.keys(allFoodsHash).map((id) => {
//       return db.Abbrev.findById(id);
//     })
//   );
//   const abbrevs = await getAbbrevs;
//   console.log(abbrevs);
//   const foodDescs = abbrevs.reduce((accum, abbrev) => {
//     accum.push(abbrev.foodDesc);
//     return accum;
//   }, []);
//   const weights = abbrevs.reduce((accum, abbrev) => {
//     return accum.concat(abbrev.weights);
//   }, []);
//   fs.writeFile('server/db/seed/data/partial/foodDescPartial.json', JSON.stringify(foodDescs), (err) => {
//     if (err) {
//       throw err;
//     }
//     console.log(chalk.inverse.magenta('foodDesc.json written'));
//   });
//   fs.writeFile('server/db/seed/data/partial/weightsPartial.json', JSON.stringify(weights), (err) => {
//     if (err) {
//       throw err;
//     }
//     console.log(chalk.inverse.magenta('weights.json written'));
//   });
//   fs.writeFile('server/db/seed/data/partial/abbrevsPartial.json', JSON.stringify(abbrevs), (err) => {
//     if (err) {
//       throw err;
//     }
//     console.log(chalk.inverse.magenta('abbrevs.json written'));
//   });
// }

// seedFilteredMeals();

/* istanbul ignore next */
db.sequelize.sync({ force: true })
  .then(() => {
    seeding('Abbrev');
    return db.Abbrev.bulkCreate(require('./data/partial/abbrevsPartial'));
  })
  // .then(() => {
  //   seedInfo('Abbrev', 'AbbrevMicro');
  //   return db.AbbrevMicro.bulkCreate(require('./data/abbrev-micro'));
  // })
  .then(() => {
    seedInfo('Abbrev', 'FoodGroup');
    return db.FoodGroup.bulkCreate(require('./data/fd-group'));
  })
  .then(() => {
    seedInfo('FoodGroup', 'FoodDesc');
    return db.FoodDesc.bulkCreate(require('./data/partial/foodDescPartial'));
  })
  .then(() => {
    seedInfo('FoodDesc', 'Weight');
    return db.Weight.bulkCreate(require('./data/partial/weightsPartial'));
  })
  .then(() => {
    seeded('Weight');
    console.log(chalk.green.inverse.bold(' Seeded OK '));
  })
  .then(() => db.sequelize.query('ALTER SEQUENCE abbrevs_id_seq RESTART WITH 8804'))
  .then(() => db.sequelize.query('ALTER SEQUENCE "abbrevMicros_id_seq" RESTART WITH 8463'))
  .then(() => db.sequelize.query('ALTER SEQUENCE "foodDescs_id_seq" RESTART WITH 8650'))
  .then(() => db.sequelize.query('ALTER SEQUENCE "weights_id_seq" RESTART WITH 15242'))
  .then(() => process.exit())
  .catch((er) => console.log(er.stack));


/* istanbul ignore next */
function seedInfo(justseeded, nexttoseed) {
  seeded(justseeded);
  seeding(nexttoseed);
}
/* istanbul ignore next */
function seeded(nexttoseed) {
  const msg = ` -> ${nexttoseed} seeded`;
  console.log(chalk.blue.bold(msg));
  console.log(msg.replace(/./g, '-'));
}
/* istanbul ignore next */
function seeding(seed) {
  console.log(chalk.magenta(` - Seeding ${seed}`));
}
/* istanbul ignore next */
