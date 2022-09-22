const { expect } = require('chai');
const { connectDatabase } = require('@kym/db');
const {
  Abbrev,
  FoodGroup,
  User,
  destroyAll,
  sequelize,
} = connectDatabase();

describe('routes/food/controllers/createFoodV1', () => {
  beforeEach(async () => {
    await destroyAll();
    await User.bulkCreate(testData.users);
    await FoodGroup.create({
      groupid: '0100',
      description: 'Description',
    });
  });
  after(async () => {
    await destroyAll();
  });
  describe('POST /api/food', () => {
    const mockFood = {
      main: 'Cheese',
      sub: 'Big Cheese',
      calories: '100',
      protein: '8',
      carbohydrates: '8',
      fat: '4',
      servingDescription: 'g',
      servingWeight: '100',
      servingSize: '100',
      group: '100',
    };
    it('should create a food', async () => {
      await sequelize.query('ALTER SEQUENCE abbrevs_id_seq RESTART WITH 1');
      const res = await agent.postWithToken('/api/food/v1')
        .send(mockFood);

      expect(res.statusCode).equal(201);
      expect(res.body.abbrevId).equal(1);
    });
    it('fails nicely', async () => {
      const res = await agent.postWithToken('/api/food/v1')
        .send({});
      expect(res.statusCode).equal(400);
    });
    it('fails nicely with duplicate id', async () => {
      await Abbrev.bulkCreate(testData.abbrevs);
      await sequelize.query('ALTER SEQUENCE abbrevs_id_seq RESTART WITH 1');
      const res = await agent.postWithToken('/api/food/v1')
        .send(mockFood);

      expect(res.statusCode).equal(500);
    });
  });
});
