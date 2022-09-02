const { connectDatabase } = require('@kym/db');
const { Abbrev } = connectDatabase();
const abbrevs = include('test-data/abbrev');
const app = include('app');
const supertest = require('supertest');
const assert = require('assert');

const agent = supertest.agent(app);

describe('calculate api', () => {
  before(async () => {
    await Abbrev.bulkCreate(abbrevs);
  });
  after(async () => {
    await Abbrev.destroy({ where: {}, force: true });
  });


  it('should be okay with good choices and goals', (done) => {
    agent
      .get('/api/calculate?id[]=2514&id[]=5470&id[]=2768&proteinGoal=20&carbGoal=30&fatGoal=20')
      .set('Accept', 'application/json')
      .expect((res) => {
        assert(!res.body.error);
        assert(res.body[0].foods);
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should be okay', (done) => {
    agent
      .get('/api/calculate?id[]=2514&id[]=2583&id[]=2768&proteinGoal=20&carbGoal=30&fatGoal=20')
      .set('Accept', 'application/json')
      .expect((res) => {
        assert(res.body.error);
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
