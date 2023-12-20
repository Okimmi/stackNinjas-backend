const bcrypt = require('bcryptjs');
const { User } = require('../../models/user');
const { ctrlWrapper, httpError } = require('../../utils');

const signUp = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw httpError({ status: 409, message: 'Email already use' });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    user: result,
  });
};

module.exports = ctrlWrapper(signUp);
