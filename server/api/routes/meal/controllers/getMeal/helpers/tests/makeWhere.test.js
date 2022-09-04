const { connectDatabase } = require('@kym/db');
const { sequelize } = connectDatabase();
const { expect } = require('chai');
const users = include('test-data/users.json');
const makeWhere = require('../makeWhere');

const { Op } = sequelize;

describe('meal/controllers/getMeal/helpers/makeWhere', () => {
  let postWorkout;
  let meals;
  let user_id;
  beforeEach(() => {
    meals = [3];
    user_id = users[0].uuid;
    postWorkout = 'false';
  });

  it('gives a basic where statement', () => {
    const where = makeWhere(null, postWorkout, user_id);
    expect(where).to.eql({
      user_uuid: { [Op.ne]: user_id },
      public: true
    });
  });
  it('gives a where statement with meals', () => {
    const where = makeWhere(meals, postWorkout, user_id);
    expect(where).to.eql({
      user_uuid: { [Op.ne]: user_id },
      public: true,
      meal: { [Op.or]: meals }
    });
  });
  it('gives a where statement with postWorkout="true"', () => {
    postWorkout = true;
    const where = makeWhere(meals, 'true', user_id);
    expect(where).to.eql({
      user_uuid: { [Op.ne]: user_id },
      public: true,
      postWorkout: true,
      meal: { [Op.or]: meals }
    });
  });
});
