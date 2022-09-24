const { connectDatabase } = require('@kym/db');
const { Abbrev, User, MealGoals, destroyAll } = connectDatabase();
const { expect } = require('chai');
const { errorMessages } = require('./controllers/singleMealCalculateV1/validation');
const dayMealsCalculation = require('./controllers/dayMealsCalculateV1');

describe('calculate api', () => {
  before(async () => {
    await Abbrev.bulkCreate(testData.abbrevs);
    await User.bulkCreate(testData.users);
    await MealGoals.bulkCreate(testData.mealGoals);
  });
  after((done) => {
    destroyAll().then(() => done());
  });

  describe('GET /api/calculate', () => {
    it('should be okay with good choices and goals', async () => {
      const res = await globals.agent
        .getWithToken('/api/calculate/v1?id[]=2514&id[]=5470&id[]=2768&proteinGoal=20&carbGoal=30&fatGoal=20')
        .set('Content-Type', 'application/json');

      expect(res.get('Content-Type').includes('json')).to.eql(true);
      expect(res.statusCode).to.eql(200);
      expect(res.body.result).to.be.ok;
    });

    it('should be okay', async () => {
      const res = await agent
        .getWithToken('/api/calculate/v1?id[]=2514&id[]=2583&id[]=2768&proteinGoal=20&carbGoal=30&fatGoal=20')
        .set('Accept', 'application/json');

      expect(res.get('Content-Type').includes('json')).to.eql(true);
      expect(res.statusCode).to.eql(200);
    });

    it('should not be okay without params', async () => {
      const res = await agent
        .getWithToken('/api/calculate/v1') // no goals
        .set('Accept', 'application/json');

      expect(res.statusCode).to.eql(400);
      expect(res.body[0].message).to.eql(errorMessages.INVALID_GOAL_PROTEIN);
      expect(res.body[1].message).to.eql(errorMessages.INVALID_GOAL_CARBOHYDRATES);
      expect(res.body[2].message).to.eql(errorMessages.INVALID_GOAL_FAT);
    });
  });
  describe('post /api/calculate/day', () => {
    it('is okay', async () => {
      const meal = await dayMealsCalculation({ type: 'TRAIN' }, testData.users[0].uuid);
      expect(meal).to.be.ok;
    });
    it('post is okay', async () => {
      const res = await agent
        .postWithToken('/api/calculate/day/v1')
        .send({ type: 'REST' })
        .set('Accept', 'application/json');

      expect(res).to.be.ok;
    });
    it('post fails body validation', async () => {
      const res = await globals.agent
        .postWithToken('/api/calculate/day/v1')
        .send({ type: 'MOCKVALUE' }) // fails here ✔️
        .set('Accept', 'application/json');

      expect(res).to.be.ok;
      expect(res.statusCode).to.eql(400);
    });
  });
});
