const { ctrlWrapper } = require('../../utils');

const current = (req, res, next) => {
  req.user.token = undefined;
  req.user.password = undefined;
  req.user.restorePasswordToken = undefined;

  res.status(200).json(req.user);
};

module.exports = ctrlWrapper(current);
