const { User } = require("../../models/user");
const addTelegramUser = require("../../utils/addTelegramUser");

const startBotController = (bot) => {
  bot.onText(/\/start (.+)/, async (msg, match) => {
    const chatId = msg.from.id;
    const userId = match[1];

    const telegramUser = await User.findOne({ chatId });

    if (!telegramUser) {
      await addTelegramUser(bot, userId, chatId);
    } else {
      bot.sendMessage(chatId, `Sorry, you has already started chat bot.`);
      console.log(`User ${userId} has already started chat bot`);
    }
  });
};

module.exports = startBotController;
