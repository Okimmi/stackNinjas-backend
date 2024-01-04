const moment = require("moment-timezone");
const getTelegramUsers = require("./getTelegramUsers");
const { HydrationEntry } = require("../models/hydrationEntry");

function sendTelegramReminder(bot) {
  const oneHourAgo = moment().tz("Etc/GMT").subtract(1, "hour");

  getTelegramUsers().then((users) => {
    users.forEach(async ({ id, chatId }) => {
      const entry = await HydrationEntry.findOne({
        owner: id,
        time: { $gte: oneHourAgo.toDate() },
      });
      if (!entry) {
        bot.sendMessage(
          chatId,
          "Hey there! 🌊 Time to hydrate yourself! Grab a glass of water and stay refreshed! 💧💦\nhttps://okimmi.github.io/stackNinjas-frontend/"
        );
      }
    });
  });
}

module.exports = sendTelegramReminder;
