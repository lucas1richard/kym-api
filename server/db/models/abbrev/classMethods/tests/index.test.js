const { Abbrev } = include('db');
const abbrevs = include('test-data/abbrev');
const { expect } = require('chai');

const isOkay = (assertion) => expect(assertion).to.be.ok;

describe('/db/models/abbrev/classMethods', () => {
  before(async () => {
    await Abbrev.bulkCreate(abbrevs);
  });
  after(async () => {
    await Abbrev.destroy({ where: {}, force: true });
  });


  it('Gives a longname upon find', async () => {
    const record = await Abbrev.findOne();
    isOkay(record.longname);
  });

  it('Gives a maxMacro upon find', async () => {
    const record = await Abbrev.findById(abbrevs[0].id);
    isOkay(record.maxMacro);
  });

  it('(calculateMacros) Gives accurate food calculations', async () => {
    const goals = { proteinGoal: 20, carbGoal: 30, fatGoal: 10 };

    const foodsPromise = Promise.all([
      Abbrev.findById(2514),
      Abbrev.findById(5470),
      Abbrev.findById(2768)
    ]);
    const foods = await foodsPromise;
    const result = await Abbrev.calculateMacros(goals, null, foods);
    const total = result.reduce((memo, fa) => {
      const { macros } = fa;
      /* eslint-disable no-param-reassign */
      memo.protein += macros.protein;
      memo.carbs += macros.carbs;
      memo.fat += macros.fat;
      return memo;
    }, { protein: 0, carbs: 0, fat: 0 });
    expect(total.protein).to.be.closeTo(20, 0.3);
    expect(total.carbs).to.be.closeTo(30, 0.3);
    expect(total.fat).to.be.closeTo(10, 0.3);
  });
});

