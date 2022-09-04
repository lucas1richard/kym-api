function cleanWeight(body) {
  const { servingDescription, servingWeight, servingSize } = body;

  return {
    seq: 1,
    amount: servingSize,
    description: servingDescription,
    gr_wgt: servingWeight
  };
}

module.exports = cleanWeight;
