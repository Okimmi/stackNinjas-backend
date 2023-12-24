const { User } = require('../../models/user');
const { httpError, ctrlWrapper } = require('../../utils');
const bcrypt = require('bcryptjs');

const updatePassword = async (req, res, next) => {
  const { restorePasswordToken } = req.params;
  const { password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.findOneAndUpdate(
    { restorePasswordToken },
    { password: hashPassword, restorePasswordToken: null }
  );

  if (!result) {
    throw httpError({ status: 404 });
  }

  res.status(200).json({ message: 'Password updated successfully' });
};

module.exports = ctrlWrapper(updatePassword);
