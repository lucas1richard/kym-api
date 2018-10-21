function bmr(age, genderString, heightNumber, weightNumber, units) {
  const gender = genderString === 'male' ? 5 : -161;
  const height = units === 'imperial' ? (2.54 * heightNumber) / 100 : heightNumber / 100;
  const weight = units === 'imperial' ? weightNumber * 0.45359237 : weightNumber;
  return Math.round(((10 * weight) + (625 * height) + gender) - (5 * age));
}

module.exports = {
  bmr
};
