const Joi = require('joi');
const { errorMessages } = require('../constants');

const { missingFieldsErr } = errorMessages;

const notEmptyBodySchema = Joi.object().min(1).messages({
  'object.min': missingFieldsErr,
});

module.exports = notEmptyBodySchema;
