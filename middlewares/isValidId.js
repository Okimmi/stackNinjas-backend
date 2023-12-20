const { isValidObjectId } = require('mongoose');
const { httpError } = require('../utils');

const isValidId = (req, res, next) => {
  const { entryId } = req.params;
  if (!isValidObjectId(entryId)) {
    return next(
      httpError({ status: 404, message: `${entryId} is not valid id` })
    );
  }
  next();
};

module.exports = isValidId;
