const { connectDatabase } = require('@kym/db');
const { Abbrev } = connectDatabase();
const abbrev = include('test-data/abbrev.json');
const autocomplete = require('../');
const { expect } = require('chai');

describe('routes/food/autocomplete', () => {
  beforeEach(() => {
  });
  before(async () => {
    await Abbrev.bulkCreate(abbrev);
  });
  after(async () => {
    await Abbrev.destroy({ where: {}, force: true });
  });
  it('catches an error', async () => {
    await autocomplete({ foodname: 'c' });
  });
  it('returns an object', async () => {
    const foods = await autocomplete({ foodname: 'chicken' });
    expect(foods).to.be.ok;
  });
});
