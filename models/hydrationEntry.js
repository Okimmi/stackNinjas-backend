const { Schema, model } = require('mongoose');
const Joi = require('joi');
const hooks = require('./hooks');
const { errorMessages, profileSettings } = require('../constants');

const { handleMongooseError, preUpdate } = hooks;
const {
  timeFeatureErr,
  dailyWaterRequirementErr,
  amountRequiredErr,
  timeRequiredErr,
} = errorMessages;
const { maxAmountOfWaterDrunk, minAmountOfWaterDrunk } = profileSettings;

const hydrationEntrySchema = new Schema(
  {
    time: {
      type: Date,
      max: [Date.now, timeFeatureErr],
      required: [true, timeRequiredErr],
    },
    amount: {
      type: Number,
      min: [minAmountOfWaterDrunk, dailyWaterRequirementErr],
      max: [maxAmountOfWaterDrunk, dailyWaterRequirementErr],
      required: [true, amountRequiredErr],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

hydrationEntrySchema.pre('findOneAndUpdate', preUpdate);
hydrationEntrySchema.post('save', handleMongooseError);
hydrationEntrySchema.post('findOneAndUpdate', handleMongooseError);

const addHydrationEntrySchema = Joi.object({
  time: Joi.date().max('now').required().messages({
    'any.required': timeRequiredErr,
    'date.max': timeFeatureErr,
  }),
  amount: Joi.number()
    .min(minAmountOfWaterDrunk)
    .max(maxAmountOfWaterDrunk)
    .required()
    .messages({
      'any.required': amountRequiredErr,
      'number.min': dailyWaterRequirementErr,
      'number.max': dailyWaterRequirementErr,
    }),
});

const updateHydrationEntrySchema = Joi.object().min(1).messages({
  'object.min': 'Missing fields',
});

const HydrationEntry = model('hydrationEntry', hydrationEntrySchema);

module.exports = {
  HydrationEntry,
  addHydrationEntrySchema,
  updateHydrationEntrySchema,
};
