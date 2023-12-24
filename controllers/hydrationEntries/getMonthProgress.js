const { ctrlWrapper, httpError } = require('../../utils');
const { HydrationEntry } = require('../../models/hydrationEntry');
const {
  getMatchByTimeStage,
  getSortByTimeStage,
  getGroupByDayStage,
  getEntriesInfoStage,
  getAddMonthNameStage,
  getAddDailyDataPostfixStage,
  getAddObjectIdStage,
  getRoundNumbersStage,
} = require('./aggregationStages');
const { errorMessages } = require('../../constants');

const { invalidDateErr } = errorMessages;

const getMonthProgress = async (req, res, next) => {
  const { month, year } = req.query;
  const { _id: owner } = req.user;

  if (!month || !year) {
    throw httpError({
      status: 400,
      message: invalidDateErr,
    });
  }

  const matchByTimeStage = getMatchByTimeStage({ month, year, owner });
  const sortByTimeStage = getSortByTimeStage();
  const groupByDayStage = getGroupByDayStage();
  const entriesInfoStage = getEntriesInfoStage();
  const roundNumbersStage = getRoundNumbersStage();
  const addMonthNameStage = getAddMonthNameStage();
  const addDailyDataPostfixStage = getAddDailyDataPostfixStage();
  const addObjectIdStage = getAddObjectIdStage();

  const result = await HydrationEntry.aggregate([
    matchByTimeStage,
    sortByTimeStage,
    groupByDayStage,
    entriesInfoStage,
    roundNumbersStage,
    addMonthNameStage,
    addDailyDataPostfixStage,
    addObjectIdStage,
  ]);

  res.status(200).json(result);
};

module.exports = ctrlWrapper(getMonthProgress);
