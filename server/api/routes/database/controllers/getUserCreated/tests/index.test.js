const { connectDatabase } = require('@kym/db');
const { Abbrev, User } = connectDatabase();
const users = include('test-data/users');
const abbrevs = include('test-data/abbrev');
const sinon = require('sinon');
const getUserCreated = require('../');
const { expect } = require('chai');

describe('routes/database/getUserCreated', () => {
  let next;
  let res;
  beforeEach(() => {
    next = sinon.spy();
    res = {
      locals: { user_id: 1 },
      json: sinon.spy()
    };
  });
  before(async () => {
    await User.bulkCreate(users);
    await Abbrev.bulkCreate(abbrevs);
  });
  after(async () => {
    await User.destroy({ where: {}, force: true });
    await Abbrev.destroy({ where: {}, force: true });
  });
  it('catches an error', async () => {
    delete res.locals.user_id;
    await getUserCreated({}, res, next);
    expect(next.called).equal(true);
  });
  it('returns an array', async () => {
    await getUserCreated({}, res, next);
    expect(res.json.called).equal(true);
  });
});

