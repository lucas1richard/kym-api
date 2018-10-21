const { User } = include('db');

const getFavoriteFoods = async (uuid) => {
  const user = await User.findById(uuid);
  const abbrevs = await user.getAbbrevs();
  return abbrevs;
};

module.exports = getFavoriteFoods;
