const { findHydrationEntryFilter } = require('../../constants');
const { HydrationEntry } = require('../../models/hydrationEntry');
const { ctrlWrapper, httpError } = require('../../utils');

const getById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { entryId: _id } = req.params;

  const result = await HydrationEntry.findOne({ _id, owner }).select(
    findHydrationEntryFilter
  );

  if (!result) {
    throw httpError({ status: 404 });
  }

  res.status(200).json(result);
};

module.exports = ctrlWrapper(getById);
