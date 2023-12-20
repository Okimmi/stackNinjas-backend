const { HydrationEntry } = require('../../models/hydrationEntry');
const {
  ctrlWrapper,
  getTodayTime,
  httpError,
  getTodayProgress,
} = require('../../utils');

const getTodaysProgress = async (req, res, next) => {
  const { _id: owner, dailyWaterRequirement } = req.user;

  if (!dailyWaterRequirement) {
    throw httpError({
      status: 400,
      message: 'Set your daily water requirement',
    });
  }

  const today = getTodayTime();
  const result = await HydrationEntry.find({ time: { $gte: today }, owner });
  const todayProgress = getTodayProgress({
    entries: result,
    dailyWaterRequirement,
  });

  res.status(200).json({ data: result, progress: todayProgress });
};

module.exports = ctrlWrapper(getTodaysProgress);
