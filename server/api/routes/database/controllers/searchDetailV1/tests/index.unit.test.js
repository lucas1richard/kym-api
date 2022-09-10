const { connectDatabase } = require('@kym/db');
const { Abbrev, FoodDesc, FoodGroup } = connectDatabase();
const searchDetail = require('../');
const { expect } = require('chai');

describe('routes/database/searchDetail', () => {
  beforeEach(() => {
  });
  before(async () => {
    await Abbrev.bulkCreate(testData.abbrevs);
    await FoodGroup.bulkCreate(testData.foodGroups);
    await FoodDesc.bulkCreate(testData.foodDesc);
  });
  after(async () => {
    await Abbrev.destroy({ where: {}, force: true });
    await FoodDesc.destroy({ where: {}, force: true });
    await FoodGroup.destroy({ where: {}, force: true });
  });
  it('returns records with searchVal', async () => {
    const result = await searchDetail({ searchVal: 'chicken' });

    expect(result.count).to.be.ok;
    expect(result.rows).to.be.ok;
    expect(result.query).to.be.ok;
    expect(result.offset).to.equal(0);
  });
  it('returns records with no input', async () => {
    const result = await searchDetail({});

    expect(result).to.be.ok;
  });
  it('returns records with maxPercent', async () => {
    const result = await searchDetail({ proteinPer: '95', carbsPer: '0', fatPer: '5' });

    expect(result).to.be.ok;
  });
});
