function cleanFoodDesc(body) {
  const { main, sub, group } = body;

  return {
    FdGrp_Cd: group,
    Long_Desc: `${main}, ${sub}`,
    Short_Desc: `${main},${sub}`.toUpperCase(),
  };
}

module.exports = cleanFoodDesc;
