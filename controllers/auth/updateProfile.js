const { User } = require('../../models/user');
const { ctrlWrapper, filterFieldsToUpdate } = require('../../utils');

const updateProfile = async (req, res, next) => {
  const { _id: id } = req.user;
  const { set, unset } = filterFieldsToUpdate(req.body);
  const result = await User.findByIdAndUpdate(id, {
    $set: set,
    $unset: unset,
  }).select('-token -password');

  res.status(200).json(result);
};

module.exports = ctrlWrapper(updateProfile);
