const { Schema, model } = require('mongoose');
const Joi = require('joi');
const hooks = require('./hooks');
const { errorMessages, regExp, profileSettings } = require('../constants');

const { emailRegExp, notEmptyValueRegExp } = regExp;
const { handleMongooseError, preUpdate } = hooks;
const {
  passMinLength,
  passMaxLength,
  genders,
  minDailyWaterRequirement,
  maxDailyWaterRequirement,
} = profileSettings;

const {
  emailRegExpErr,
  emailRequiredErr,
  passwordRequiredErr,
  passwordMinLengthErr,
  passwordMaxLengthErr,
  passwordRepeatErr,
  passwordRepeatRequiredErr,
  genderEnumErr,
  dailyWaterRequirementErr,
  dailyWaterRequirement,
  emptyStringErr,
  missingFieldsErr,
} = errorMessages;

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: [emailRegExp, emailRegExpErr],
      required: [true, emailRequiredErr],
      unique: true,
    },
    password: {
      type: String,
      match: [notEmptyValueRegExp, emptyStringErr],
      minLength: [passMinLength, passwordMinLengthErr],
      required: [true, passwordRequiredErr],
    },
    token: {
      type: String,
      default: null,
    },
    avatar: String,
    gender: {
      type: String,
      enum: {
        values: genders,
        message: genderEnumErr,
      },
    },
    name: {
      type: String,
      match: [notEmptyValueRegExp, emptyStringErr],
    },
    dailyWaterRequirement: {
      type: Number,
      min: [minDailyWaterRequirement, dailyWaterRequirementErr],
      max: [maxDailyWaterRequirement, dailyWaterRequirementErr],
    },
    restorePasswordToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('findOneAndUpdate', preUpdate);
userSchema.post('save', handleMongooseError);
userSchema.post('findOneAndUpdate', handleMongooseError);

const emailSettings = Joi.string().pattern(emailRegExp).messages({
  'any.required': emailRequiredErr,
  'string.pattern.base': emailRegExpErr,
});

const passwordSettings = Joi.string()
  .pattern(notEmptyValueRegExp)
  .min(passMinLength)
  .max(passMaxLength)
  .messages({
    'any.required': passwordRequiredErr,
    'string.min': passwordMinLengthErr,
    'string.max': passwordMaxLengthErr,
    'string.pattern.base': emptyStringErr,
  });

const passwordRepeatSettings = Joi.string()
  .valid(Joi.ref('password'))
  .messages({
    'any.required': passwordRepeatRequiredErr,
    'any.only': passwordRepeatErr,
  });

const signUpSchema = Joi.object({
  email: emailSettings.required(),
  password: passwordSettings.required(),
  passwordRepeat: passwordRepeatSettings.required(),
});

const signInSchema = Joi.object({
  email: emailSettings.required(),
  password: passwordSettings.required(),
});

const dailyWaterRequirementSchema = Joi.object({
  dailyWaterRequirement: Joi.number()
    .min(minDailyWaterRequirement)
    .max(maxDailyWaterRequirement)
    .required()
    .messages({
      'any.required': dailyWaterRequirement,
      'number.min': dailyWaterRequirementErr,
      'number.max': dailyWaterRequirementErr,
    }),
});

const updateProfileSchema = Joi.object({
  password: passwordSettings,
  passwordRepeat: Joi.string().when('password', {
    is: String,
    then: passwordRepeatSettings.required(),
  }),
  passwordOutdated: passwordSettings,
  gender: Joi.string()
    .valid(...genders)
    .messages({
      'any.only': genderEnumErr,
    }),
  name: Joi.string().pattern(notEmptyValueRegExp).messages({
    'string.empty': emptyStringErr,
  }),
  email: emailSettings,
})
  .min(1)
  .messages({
    'object.min': missingFieldsErr,
  });

const updatePasswordSchema = Joi.object({
  password: passwordSettings.required(),
  passwordRepeat: passwordRepeatSettings.required(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  signUpSchema,
  signInSchema,
  dailyWaterRequirementSchema,
  updateProfileSchema,
  updatePasswordSchema,
};
