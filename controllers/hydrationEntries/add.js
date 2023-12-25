const { HydrationEntry } = require('../../models/hydrationEntry');
const { ctrlWrapper, getWaterIntakeTime } = require('../../utils');

const add = async (req, res, next) => {
  const { _id: owner, dailyWaterRequirement } = req.user;
  const { time } = req.body;
  const waterIntakeTime = getWaterIntakeTime(time);

  const result = await HydrationEntry.create({
    ...req.body,
    owner,
    time: waterIntakeTime,
    dailyWaterRequirement,
  });
  result.owner = undefined;

  res.status(201).json(result);
};

module.exports = ctrlWrapper(add);
