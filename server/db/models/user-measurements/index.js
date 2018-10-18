const sequelize = require('../../conn');

const { Sequelize } = sequelize;


const UserMeasurements = sequelize.define('userMeasurement', {
  age: {
    type: Sequelize.DECIMAL
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  },
  height: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  units: {
    type: Sequelize.ENUM,
    values: ['imperial', 'metric'],
    allowNull: false
  },
  weight: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  bodyfat: {
    type: Sequelize.DECIMAL,
    allowNull: true
  },
  lifestyle: {
    type: Sequelize.ENUM,
    values: ['Sedentary', 'Normal', 'Active'],
    allowNull: false
  },
  goal: {
    type: Sequelize.ENUM,
    values: ['Lose Fat', 'Gain Muscle', 'Maintain'],
  },
  date: {
    type: Sequelize.DATE,
  },
  bmrTraditional: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  bmrBodyFat: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  hooks: {
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
});

function bmr(age, genderString, heightNumber, weightNumber, units) {
  const gender = genderString === 'male' ? 5 : -161;
  const height = units === 'imperial' ? (2.54 * heightNumber) / 100 : heightNumber / 100;
  const weight = units === 'imperial' ? weightNumber * 0.45359237 : weightNumber;
  return Math.round(((10 * weight) + (625 * height) + gender) - (5 * age));
}

UserMeasurements.findAllByUserId = async function findAllByUserId(user_id) {
  const measurements = await this.findAll({
    where: {
      user_id
    },
    order: [
      ['date', 'DESC']
    ]
  });
  return measurements;
};

module.exports = UserMeasurements;
