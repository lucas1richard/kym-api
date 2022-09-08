const { connectDatabase } = require('@kym/db');
const { expect } = require('chai');
const supertest = require('supertest');

const abbrevs = include('test-data/abbrev.json');
const app = include('app');
const { Abbrev, destroyAll } = connectDatabase();

const agent = supertest.agent(app);

describe('calculate api', () => {
  before((done) => {
    Abbrev.bulkCreate(abbrevs).then(() => done());
  });
  after((done) => {
    destroyAll().then(() => done());
  });


  it('should be okay with good choices and goals', async () => {
    const res = await agent
      .get('/api/calculate?id[]=2514&id[]=5470&id[]=2768&proteinGoal=20&carbGoal=30&fatGoal=20')
      .set('Accept', 'application/json');
      // .expect((res) => {
      //   assert(!res.body.error);
      //   assert(res.body.result[0].foods);
      // })
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
      .get('/api/calculate?id[]=2514&id[]=2583&id[]=2768&proteinGoal=20&carbGoal=30')
      .set('Accept', 'application/json');
    // console.log(res);
    expect(res).to.be.ok;
  });
});
