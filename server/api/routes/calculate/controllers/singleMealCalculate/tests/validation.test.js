const {
  proteinGoalSchema,
  carbGoalSchema,
  fatGoalSchema,
  idIndSchema,
  querySchema
} = require('../validation');

describe('calculate/controllers/singleMealCalculate/validation', () => {
  describe('proteinGoalSchema', () => {
    it('should be okay with a number', (done) => {
      proteinGoalSchema.validate(1, done);
    });
    it('should be okay fail otherwise', (done) => {
      proteinGoalSchema.validate('something absurd', (err) => {
        if (err) {
          done();
        } else {
          done(new Error('Test should fail'));
        }
      });
    });
    it('should give a helpful error message', (done) => {
      proteinGoalSchema.validate('something absurd', (err) => {
        if (err && err.message === 'The protein goal must be a number') {
          done();
        } else {
          done(new Error('Test should fail'));
        }
      });
    });
  });
  describe('carbGoalSchema', () => {
    it('should be okay with a number', (done) => {
      carbGoalSchema.validate(1, done);
    });
    it('should be okay fail otherwise', (done) => {
      carbGoalSchema.validate('something absurd', (err) => {
        if (err) {
          done();
        } else {
          done(new Error('Test should fail'));
        }
      });
    });
    it('should give a helpful error message', (done) => {
      carbGoalSchema.validate('something absurd', (err) => {
        if (err && err.message === 'The carb goal must be a number') {
          done();
        } else {
          done(new Error('Test should fail'));
        }
      });
    });
  });
  describe('fatGoalSchema', () => {
    it('should be okay with a number', (done) => {
      fatGoalSchema.validate(1, done);
    });
    it('should be okay fail otherwise', (done) => {
      fatGoalSchema.validate('something absurd', (err) => {
        if (err) {
          done();
        } else {
          done(new Error('Test should fail'));
        }
      });
    });
    it('should give a helpful error message', (done) => {
      fatGoalSchema.validate('something absurd', (err) => {
        if (err && err.message === 'The fat goal must be a number') {
          done();
        } else {
          done(new Error('Test should fail'));
        }
      });
    });
  });
  describe('idIndSchema', () => {
    it('should be okay with a number', (done) => {
      idIndSchema.validate(1, done);
    });
    it('should be okay fail otherwise', (done) => {
      idIndSchema.validate('something absurd', (err) => {
        if (err) {
          done();
        } else {
          done(new Error('Test should fail'));
        }
      });
    });
    it('should give a helpful error message', (done) => {
      idIndSchema.validate('something absurd', (err) => {
        if (err && err.message === 'The id must be a number') {
          done();
        } else {
          done(new Error('Test should fail'));
        }
      });
    });
  });
  describe('querySchema', () => {
    it('should require an object', (done) => {
      querySchema.validate({
        proteinGoal: 1,
        carbGoal: 1,
        fatGoal: 1,
        id: [1]
      }, done);
    });
  });
});