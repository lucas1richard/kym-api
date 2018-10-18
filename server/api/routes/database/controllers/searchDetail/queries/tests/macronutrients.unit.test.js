const { sequelize } = include('db');
const { expect } = require('chai');
const { proteinQuery, carbQuery, fatQuery, carbs, fat, protein } = require('../macronutrients');

describe('macronutrient queries', () => {
  const noPercentMsg = 'The percent must be a number';
  const noComparatorMsg = 'The comparator must be one of \'<\', \'>\', \'<=\', \'>=\', \'=\'';

  describe('proteinQuery', () => {
    it('gives a query', () => {
      const percent = 5;
      const comparator = '>';
      const query = proteinQuery(5, '>');
      expect(query).to.eql(sequelize.where(sequelize.col('abbrev.Protein'), comparator, sequelize.literal(`(((${percent * 4} * ${carbs}) + (${percent * 9} * ${fat}))/ (${4 - (percent * 4)}))`)));
    });
    it('fails without a percent', () => {
      try {
        proteinQuery(undefined, '>');
      } catch (err) {
        expect(err.message).to.equal(noPercentMsg);
      }
    });
    it('fails without a comparator', () => {
      try {
        proteinQuery(5, undefined);
      } catch (err) {
        expect(err.message).to.equal(noComparatorMsg);
      }
    });
    it('fails without a valid comparator', () => {
      try {
        proteinQuery(5, '!!!');
      } catch (err) {
        expect(err.message).to.equal(noComparatorMsg);
      }
    });
  });

  describe('carbQuery', () => {
    it('gives a query', () => {
      const percent = 5;
      const comparator = '>';
      const query = carbQuery(5, '>');
      expect(query).to.eql(sequelize.where(sequelize.col('abbrev.Carbohydrates'), comparator, sequelize.literal(`(((${percent * 4} * ${protein}) + (${percent * 9} * ${fat}))/ (${4 - (percent * 4)}))`)));
    });
    it('fails without a percent', () => {
      try {
        carbQuery(undefined, '>');
      } catch (err) {
        expect(err.message).to.equal(noPercentMsg);
      }
    });
    it('fails without a comparator', () => {
      try {
        carbQuery(5, undefined);
      } catch (err) {
        expect(err.message).to.equal(noComparatorMsg);
      }
    });
    it('fails without a valid comparator', () => {
      try {
        carbQuery(5, '!!!');
      } catch (err) {
        expect(err.message).to.equal(noComparatorMsg);
      }
    });
  });

  describe('fatQuery', () => {
    it('gives a query', () => {
      const percent = 5;
      const comparator = '>';
      const query = fatQuery(5, '>');
      expect(query).to.eql(sequelize.where(sequelize.col('abbrev.Fat'), comparator, sequelize.literal(`(((${percent * 4} * ${protein}) + (${percent * 4} * ${carbs}))/ (${9 - (percent * 9)}))`)));
    });
    it('fails without a percent', () => {
      try {
        fatQuery(undefined, '>');
      } catch (err) {
        expect(err.message).to.equal(noPercentMsg);
      }
    });
    it('fails without a comparator', () => {
      try {
        fatQuery(5, undefined);
      } catch (err) {
        expect(err.message).to.equal(noComparatorMsg);
      }
    });
    it('fails without a valid comparator', () => {
      try {
        fatQuery(5, '!!!');
      } catch (err) {
        expect(err.message).to.equal(noComparatorMsg);
      }
    });
  });
});
