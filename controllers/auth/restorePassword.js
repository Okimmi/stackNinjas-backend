const { User } = require('../../models/user');
const jwt = require('jsonwebtoken');
const { ctrlWrapper, httpError, sendEmail } = require('../../utils');

const { SECRET_KEY } = process.env;

const restorePassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw httpError({ status: 404 });
  }

  const restorePasswordToken = jwt.sign({}, SECRET_KEY, { expiresIn: '1h' });

  const result = await User.findOneAndUpdate(
    { email },
    { restorePasswordToken }
  );

  sendEmail({
    userEmail: result.email,
    token: result.restorePasswordToken,
  });

  res.status(200).json({ message: 'Password recovery email sent' });
};

module.exports = ctrlWrapper(restorePassword);
