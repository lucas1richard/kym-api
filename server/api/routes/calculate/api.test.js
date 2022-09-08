const { connectDatabase } = require('@kym/db');
const { Abbrev, User, MealGoals, destroyAll } = connectDatabase();
const app = include('app');
const supertest = require('supertest');
const { expect } = require('chai');
const { errorMessages } = require('./controllers/singleMealCalculate/validation');
const dayMealsCalculation = require('./controllers/dayMealsCalculate');

const agent = supertest.agent(app);

describe('calculate api', () => {
  before(async () => {
    await Abbrev.bulkCreate(testData.abbrevs);
    await User.bulkCreate(testData.users);
    await MealGoals.bulkCreate(testData.mealGoals);
  });
  after((done) => {
    destroyAll().then(() => done());
  });

  describe('get /api/calculate', () => {
    it('should be okay with good choices and goals', async () => {
      const res = await agent
        .get('/api/calculate?id[]=2514&id[]=5470&id[]=2768&proteinGoal=20&carbGoal=30&fatGoal=20')
        .set('Accept', 'application/json');

      expect(res.get('Content-Type').includes('json')).to.eql(true);
      expect(200);
      expect(res.body.result).to.be.ok;
    });
  
    it('should be okay', (done) => {
      agent
        .get('/api/calculate?id[]=2514&id[]=2583&id[]=2768&proteinGoal=20&carbGoal=30&fatGoal=20')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  
    it('should not be okay', async () => {
      const res = await agent
        .get('/api/calculate?id[]=2514&id[]=2583&id[]=2768&proteinGoal=20&carbGoal=30') // no fatGoal
        .set('Accept', 'application/json');
      expect(res.statusCode).to.eql(400);
      expect(res.body.devmessage.message).to.eql(errorMessages.INVALID_GOAL_FAT);
    });
  });
  describe('post /api/calculate/day', () => {
    it('id okay', async () => {
      const meal = await dayMealsCalculation({ type: 'TRAIN' }, testData.users[0].uuid);
      expect(meal).to.be.ok;
    });
  });
});
