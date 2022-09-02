const { connectDatabase, foreignKeys } = require('@kym/db');
const { FoodPreferences } = connectDatabase();

async function addPreference(uuid, abbrevId, pref) {
  const [preference] = await FoodPreferences.findOrCreate({
    where: {
      [foreignKeys.USER]: uuid,
      [foreignKeys.ABBREV]: abbrevId,
      preference: pref
    }
  });

  return preference;
}

module.exports = addPreference;
