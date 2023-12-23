const getWaterIntakeTime = (time) => {
  const date = new Date(time);
  const timezoneOffset = date.getTimezoneOffset() / 60;
  const hours = date.getHours();
  date.setHours(hours - timezoneOffset);

  return date;
};

module.exports = getWaterIntakeTime;
