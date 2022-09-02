const { User } = include('db');

const getFavoriteFoods = async (uuid) => {
  const user = await User.findByPk(uuid);
  const abbrevs = await user.getAbbrevs();
  return abbrevs;
};

module.exports = getFavoriteFoods;
