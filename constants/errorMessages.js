const profileSettings = require('./profileSettings');

const errorMessages = {
  invalidDateErr:
    'To get monthly progress, you need to specify the year and month',
  emptyStringErr: 'Value cannot be the empty string',
  missingFieldsErr: 'Missing fields',
  emailRegExpErr: 'Email must be letters, digits, dot and @',
  emailRequiredErr: 'Missing required email field',
  passwordRequiredErr: 'Missing required password field',
  passwordMinLengthErr: 'Password length must be at least 8 characters long',
  passwordMaxLengthErr:
    'Password length must be no more than 48 characters long',
  passwordRepeatRequiredErr: 'Missing required password repeat field',
  passwordRepeatErr: 'The entered passwords must be the same',
  dailyWaterRequirement: 'Missing required daily water requirement field',
  dailyWaterRequirementErr:
    'The specified volume of water is harmful to health',
  dailyWaterRequirementAbsentErr: 'Set your daily water requirement',
  genderEnumErr: `Gender must be one of ${profileSettings.genders.join(
    ' or '
  )}`,
  timeFeatureErr: 'The time is in the future',
  amountRequiredErr: 'Missing required amount field',
  timeRequiredErr: 'Missing required time field',
};

module.exports = errorMessages;
