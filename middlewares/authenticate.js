const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { httpError, ctrlWrapper } = require('../utils');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    throw httpError({ status: 401 });
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id).select('-createdAt -updatedAt');

    if (!user || user.token !== token) {
      throw httpError({ status: 401 });
    }

    req.user = user;
    next();
  } catch ({ message }) {
    throw httpError({ status: 401, message });
  }
};

module.exports = ctrlWrapper(authenticate);
