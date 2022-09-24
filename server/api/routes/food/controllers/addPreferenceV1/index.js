const { connectDatabase, foreignKeys } = require('@kym/db');
const { FoodPreferences } = connectDatabase();

/* istanbul ignore next */
async function addPreferenceV1(uuid, abbrevId, pref) {
  const [preference] = await FoodPreferences.findOrCreate({
    where: {
      [foreignKeys.USER]: uuid,
      [foreignKeys.ABBREV]: abbrevId,
      preference: pref,
    },
  });

  return preference;
}

module.exports = addPreferenceV1;
