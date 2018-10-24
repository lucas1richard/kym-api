const { FoodPreferences } = include('db');
const { USER, ABBREV } = include('db/foreignKeys');

async function addPreference(uuid, abbrevId, pref) {
  const [preference] = await FoodPreferences.findOrCreate({
    where: {
      [USER]: uuid,
      [ABBREV]: abbrevId,
      preference: pref
    }
  });

  return preference;
}

module.exports = addPreference;
