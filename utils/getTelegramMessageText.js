const getTelegramMessageText = (progress) => {
  if (progress < 30) {
    return `It's essential to stay hydrated. You've only reached ${progress}% of your daily water intake goal. 😔 Remember, drinking enough water is crucial for your well-being. Let's try to drink more water today for a healthier you.💦`;
  }

  if (progress < 60) {
    return `Keep going! You've reached ${progress}% of your daily water intake goal. You're doing well, but remember to drink water more frequently to stay hydrated!💧`;
  }

  if (progress < 90) {
    return `Great job! 👍 You're at ${progress}% of your daily water intake goal. You're so close! Just a little more to reach your target. Keep hydrating! 🥤`;
  }

  return `Congratulations! 🎉 You've reached 100% of your daily water intake goal. Well done! Stay hydrated throughout the day to maintain this healthy habit!`;
};

module.exports = getTelegramMessageText;
