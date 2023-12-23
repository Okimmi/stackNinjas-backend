const getDailyProgress = ({ entries, dailyWaterRequirement }) => {
  const amounts = entries.map(({ amount }) => amount);
  const totalAmount = amounts.reduce((acc, amount) => acc + amount, 0);

  return Math.round((100 / dailyWaterRequirement) * totalAmount);
};

module.exports = getDailyProgress;
