const { typeSchema, bodySchema } = require('../validation');

describe('dayMealsCalculate validation', () => {
  describe('typeSchema', () => {
    it('should be okay with "train"', (done) => {
      typeSchema.validate('train', done);
    });
    it('should be okay with "rest"', (done) => {
      typeSchema.validate('rest', done);
    });
    it('should fail otherwise', (done) => {
      typeSchema.validate('something absurd', (err) => {
        if (err) {
          done();
        } else {
          done(new Error('Test should fail'));
        }
      });
    });
    it('should give a helpful error message', (done) => {
      typeSchema.validate('something absurd', (err) => {
        if (err.message === 'Type must be either \'train\' or \'rest\'') {
          done();
        } else {
          done(new Error());
        }
      });
    });
  });

  describe('bodySchema', () => {
    it('should require an object', (done) => {
      bodySchema.validate({}, done);
    });
    it('should require an object with `type` property', (done) => {
      bodySchema.validate({ type: 'train' }, done);
    });
    it('should fail otherwise', (done) => {
      bodySchema.validate('something absurd', (err) => {
        if (err) {
          done();
        } else {
          done(new Error('Test should fail'));
        }
      });
    });
  });
});
