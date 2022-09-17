const { connectDatabase } = require('@kym/db');
const { expect } = require('chai');
const getFoodByNameV1 = require('.');

const { Abbrev } = connectDatabase();

const seedData = async () => {
  await Abbrev.bulkCreate(testData.abbrevs);
};

describe('getFoodByNameV1 controller', () => {
  before(seedData);
  after(globals.destroyAllHook);

  it('gets food by name, with default value for offset', async () => {
    const foods = await getFoodByNameV1({ foodname: 'chick' });
    expect(typeof foods.count).equal('number');
    expect(typeof foods.totalCount).equal('number');
    expect(foods.query).equal('chick');
    expect(typeof foods.abbrevs).equal('object');
  });
  it('gets food by name, with empty foodname', async () => {
    const foods = await getFoodByNameV1({ foodname: '' });
    expect(typeof foods.count).equal('number');
    expect(typeof foods.totalCount).equal('number');
    expect(foods.query).equal('');
    expect(typeof foods.abbrevs).equal('object');
  });
});
