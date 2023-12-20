const { User } = require('../../models/user');
const { ctrlWrapper } = require('../../utils');

const signOut = async (req, res, next) => {
  const { _id: id } = req.user;
  await User.findByIdAndUpdate(id, { token: null });

  res.status(204).json();
};

module.exports = ctrlWrapper(signOut);
