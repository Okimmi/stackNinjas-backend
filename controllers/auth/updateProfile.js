const { User } = require('../../models/user');
const {
  ctrlWrapper,
  filterFieldsToUpdate,
  getHashPassword,
} = require('../../utils');

const updateProfile = async (req, res, next) => {
  const { _id: id, password: currentPassword } = req.user;

  const { set, unset } = filterFieldsToUpdate(req.body);

  if (set.password) {
    const hashPassword = await getHashPassword({
      updateInfo: set,
      currentPassword,
    });
    set.password = hashPassword;
  }

  const result = await User.findByIdAndUpdate(id, {
    $set: set,
    $unset: unset,
  }).select('-token -restorePasswordToken -password');

  res.status(200).json(result);
};

module.exports = ctrlWrapper(updateProfile);
