const getDailyProgressById = require("./getDailyProgressById");
const getTelegramMessageText = require("./getTelegramMessageText");
const getTelegramUsers = require("./getTelegramUsers");

function sendTelegramNotification(bot) {
  getTelegramUsers().then((users) => {
    users.forEach(({ id, chatId, name, dailyWaterRequirement }) => {
      getDailyProgressById(id, dailyWaterRequirement).then((progress) => {
        bot.sendMessage(
          chatId,
          `Hello${name ? `, ${name}` : ""}!\nYour daily water norma is ${
            dailyWaterRequirement / 1000
          } L.\n\n${getTelegramMessageText(progress)}
            `
        );
      });
    });
  });
}

module.exports = sendTelegramNotification;
