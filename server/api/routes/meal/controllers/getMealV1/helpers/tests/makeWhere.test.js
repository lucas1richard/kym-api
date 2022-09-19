const { Op } = require('@kym/db');
const { expect } = require('chai');
const users = include('test-data/users.json');
const makeWhere = require('../makeWhere');

describe('meal/controllers/getMeal/helpers/makeWhere', () => {
  let postWorkout;
  let meals;
  let uuid;
  beforeEach(() => {
    meals = [3];
    uuid = users[0].uuid;
    postWorkout = 'false';
  });

  it('gives a basic where statement', () => {
    const where = makeWhere({ postWorkout, uuid, excludeOwnMeals: true });
    expect(where).to.eql({
      user_uuid: { [Op.ne]: uuid },
      public: true,
    });
  });

  it('gives a basic where statement including ownMeals', () => {
    const where = makeWhere({ postWorkout, uuid });
    expect(where).to.eql({ public: true });
  });

  it('gives a where statement with meals', () => {
    const where = makeWhere({ meals, postWorkout, uuid, excludeOwnMeals: true });
    expect(where).to.eql({
      user_uuid: { [Op.ne]: uuid },
      public: true,
      meal: { [Op.or]: meals },
    });
  });

  it('gives a where statement with postWorkout="true"', () => {
    postWorkout = true;
    const where = makeWhere({ meals, postWorkout: 'true', uuid, excludeOwnMeals: true });
    expect(where).to.eql({
      user_uuid: { [Op.ne]: uuid },
      public: true,
      postWorkout: true,
      meal: { [Op.or]: meals },
    });
  });
});
