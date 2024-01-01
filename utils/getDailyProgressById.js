const { HydrationEntry } = require("../models/hydrationEntry");
const getTodayTime = require("./getTodayTime");

const getDailyProgressById = async (owner, dailyWaterRequirement) => {
  const today = getTodayTime();

  const result = await HydrationEntry.find({ time: { $gte: today }, owner });

  const amounts = result.map(({ amount }) => amount);
  const totalAmount = amounts.reduce((acc, amount) => acc + amount, 0);

  return Math.round((100 / dailyWaterRequirement) * totalAmount);
};

module.exports = getDailyProgressById;
