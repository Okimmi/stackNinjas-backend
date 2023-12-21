const Joi = require('joi');

const notEmptyBodySchema = Joi.object().min(1).messages({
  'object.min': 'Missing fields',
});

module.exports = notEmptyBodySchema;
