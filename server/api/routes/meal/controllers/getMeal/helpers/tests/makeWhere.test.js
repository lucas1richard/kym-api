const { Op } = require('@kym/db');
const { expect } = require('chai');
const users = include('test-data/users.json');
const makeWhere = require('../makeWhere');

describe('meal/controllers/getMeal/helpers/makeWhere', () => {
  let postWorkout;
  let meals;
  let userId;
  beforeEach(() => {
    meals = [3];
    userId = users[0].uuid;
    postWorkout = 'false';
  });

  it('gives a basic where statement', () => {
    const where = makeWhere(null, postWorkout, userId);
    expect(where).to.eql({
      user_uuid: { [Op.ne]: userId },
      public: true,
    });
  });
  it('gives a where statement with meals', () => {
    const where = makeWhere(meals, postWorkout, userId);
    expect(where).to.eql({
      user_uuid: { [Op.ne]: userId },
      public: true,
      meal: { [Op.or]: meals },
    });
  });
  it('gives a where statement with postWorkout="true"', () => {
    postWorkout = true;
    const where = makeWhere(meals, 'true', userId);
    expect(where).to.eql({
      user_uuid: { [Op.ne]: userId },
      public: true,
      postWorkout: true,
      meal: { [Op.or]: meals },
    });
  });
});
