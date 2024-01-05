const moment = require("moment-timezone");
const getTelegramUsers = require("./getTelegramUsers");
const { HydrationEntry } = require("../models/hydrationEntry");

const { FRONTEND_BASE_URL } = process.env;

function sendTelegramReminder(bot) {
  const oneHourAgo = moment().tz("Etc/GMT").subtract(1, "hour");

  const keyboard = {
    inline_keyboard: [
      [
        {
          text: "💧 Click to add water 💧",
          url: FRONTEND_BASE_URL,
        },
      ],
    ],
  };

  getTelegramUsers().then((users) => {
    users.forEach(async ({ id, chatId }) => {
      const entry = await HydrationEntry.findOne({
        owner: id,
        time: { $gte: oneHourAgo.toDate() },
      });
      if (!entry) {
        bot.sendMessage(
          chatId,
          "Hey there!\n🌊 Time to hydrate yourself! Grab a glass of water and stay refreshed! 💧💦",
          {
            reply_markup: JSON.stringify(keyboard),
          }
        );
      }
    });
  });
}

module.exports = sendTelegramReminder;
