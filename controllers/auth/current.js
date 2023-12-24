const { ctrlWrapper } = require('../../utils');

const current = (req, res, next) => {
  req.user.token = undefined;
  req.user.password = undefined;

  res.status(200).json(req.user);
};

module.exports = ctrlWrapper(current);
