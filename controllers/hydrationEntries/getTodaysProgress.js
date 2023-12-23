const { errorMessages } = require('../../constants');
const { HydrationEntry } = require('../../models/hydrationEntry');
const {
  ctrlWrapper,
  getTodayTime,
  httpError,
  getDailyProgress,
} = require('../../utils');

const { dailyWaterRequirementAbsentErr } = errorMessages;

const getTodaysProgress = async (req, res, next) => {
  const { _id: owner, dailyWaterRequirement } = req.user;

  if (!dailyWaterRequirement) {
    throw httpError({
      status: 400,
      message: dailyWaterRequirementAbsentErr,
    });
  }

  const today = getTodayTime();
  const result = await HydrationEntry.find({ time: { $gte: today }, owner });
  const dailyProgress = getDailyProgress({
    entries: result,
    dailyWaterRequirement,
  });

  res.status(200).json({ data: result, progress: dailyProgress });
};

module.exports = ctrlWrapper(getTodaysProgress);
