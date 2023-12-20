const { httpError } = require('../utils');

const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    throw httpError({ status: 400, message: error.message });
  }

  next();
};

module.exports = validateBody;
