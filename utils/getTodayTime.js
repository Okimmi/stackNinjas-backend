const getTodayTime = () => {
  const todayDate = new Date();
  const timezoneOffset = todayDate.getTimezoneOffset() / 60;
  todayDate.setHours(-timezoneOffset, 0, 0, 0);

  return todayDate;
};

module.exports = getTodayTime;
