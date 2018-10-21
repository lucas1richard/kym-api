const { bmr } = require('../utils/bmr');

const hooks = {
  beforeCreate(data) {
    const { age, gender, height, weight, units } = data.get();
    let genderVal = 'male';
    if (gender) {
      genderVal = gender;
    }

    // eslint-disable-next-line no-param-reassign
    data.bmrTraditional = bmr(
      parseFloat(age),
      genderVal.toLowerCase(),
      parseFloat(height),
      parseFloat(weight),
      units
    );
    return data;
  }
}

module.exports = {
  hooks
};
