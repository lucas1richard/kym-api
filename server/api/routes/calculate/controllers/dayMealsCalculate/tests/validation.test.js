const { typeSchema, bodySchema } = require('../validation');

describe('dayMealsCalculate validation', () => {
  describe('typeSchema', () => {
    it('should be okay with "TRAIN"', (done) => {
      typeSchema.validate('TRAIN', done);
    });
    it('should be okay with "REST"', (done) => {
      typeSchema.validate('REST', done);
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
        if (err.message === 'INVALID_GOAL_TYPE') {
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
      bodySchema.validate({ type: 'TRAIN' }, done);
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
