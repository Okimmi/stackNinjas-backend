const getTodayProgress = ({ entries, dailyWaterRequirement }) => {
  const amounts = entries.map(({ amount }) => amount);
  const totalAmount = amounts.reduce((acc, amount) => acc + amount, 0);

  return (100 / dailyWaterRequirement) * totalAmount;
};

module.exports = getTodayProgress;
