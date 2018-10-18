const { Abbrev } = include('db');
const abbrev = include('test-data/abbrev');
const sinon = require('sinon');
const autocomplete = require('../');
const { expect } = require('chai');

describe('routes/food/autocomplete', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    res = {
      json: sinon.spy()
    };
    next = sinon.spy();
    req = {
      params: {
        foodname: 'chicken'
      }
    };
  });
  before(async () => {
    await Abbrev.bulkCreate(abbrev);
  });
  after(async () => {
    await Abbrev.destroy({ where: {}, force: true });
  });
  it('catches an error', async () => {
    await autocomplete(null, res, next);
    expect(next.called).equal(true);
  });
  it('returns an object', async () => {
    await autocomplete(req, res, next);
    expect(res.json.called).equal(true);
  });
});

