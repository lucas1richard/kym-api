const { connectDatabase } = require('@kym/db');
const { User } = connectDatabase();
const users = include('test-data/users');
const sinon = require('sinon');
const getUser = require('../');
const { expect } = require('chai');

describe('routes/database/getUser', () => {
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
  });
  after(async () => {
    await User.destroy({ where: {}, force: true });
  });
  it('catches an error', async () => {
    delete res.locals.user_id;
    await getUser({}, res, next);
    expect(next.called).equal(true);
    expect(next.firstCall.args[0].message).equal('No user_id provided');
  });
  it('returns 404 if the user isn\'t found', async () => {
    res.locals.user_id = 100000;
    await getUser({}, res, next);
    expect(next.called).equal(true);
    expect(next.firstCall.args[0].commonType).equal(404);
  });
  it('returns an array', async () => {
    await getUser({}, res, next);
    expect(res.json.called).equal(true);
  });
});

