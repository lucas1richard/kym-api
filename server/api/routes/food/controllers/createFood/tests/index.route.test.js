const { Abbrev, FoodDesc, FoodGroup } = include('db');
const abbrevs = include('test-data/abbrev');
const app = include('/app');
const supertest = require('supertest');
// const assert = require('assert');

const agent = supertest.agent(app);

describe('routes/food/controllers/createFood', () => {
  before(async () => {
    await Abbrev.bulkCreate(abbrevs);
    await FoodGroup.create({
      GroupID: '0100',
      Description: 'Description'
    });
  });
  after(async () => {
    await Abbrev.destroy({ where: {}, force: true });
    await FoodDesc.destroy({ where: {}, force: true });
    await FoodGroup.destroy({ where: {}, force: true });
  });
  describe('POST /api/food', () => {
    it('should create a food', (done) => {
      agent
        .post('/api/food')
        .send({
          main: 'Cheese',
          sub: 'Big Cheese',
          calories: '100',
          protein: '8',
          carbohydrates: '8',
          fat: '4',
          servingDescription: 'g',
          servingWeight: '100',
          servingSize: '100',
          group: '0100'
        })
        .set('Accept', 'application/json')
        .expect((res) => {
          console.log(res.error);
          // assert(res.error.isJoi, 'err should be isJoi');
        })
        .expect(201, done);
    });
    it('fails nicely', (done) => {
      agent
        .post('/api/food')
        .send({})
        .set('Accept', 'application/json')
        // .expect((res) => {
        //   console.log(res.error);
        //   assert(res.error.isJoi, 'err should be isJoi');
        // })
        .expect(400, done);
    });
  });
});
