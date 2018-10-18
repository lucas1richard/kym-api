const { User } = include('db');

const getFavoriteFoods = async (user_id) => {
  const user = await User.findById(user_id);
  const abbrevs = await user.getAbbrevs();
  return abbrevs;
};

module.exports = getFavoriteFoods;
