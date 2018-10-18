function cleanWeight(body) {
  const { servingDescription, servingWeight, servingSize } = body;

  return {
    Seq: 1,
    Amount: servingSize,
    Description: servingDescription,
    Gr_Wgt: servingWeight
  };
}

module.exports = cleanWeight;
