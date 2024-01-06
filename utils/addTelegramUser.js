const { isValidObjectId } = require("mongoose");
const { User } = require("../models/user");
const sendNotFoundUserBotMsg = require("./sendNotFoundUserBotMsg");

const addTelegramUser = async (bot, userId, chatId) => {
  if (isValidObjectId(userId)) {
    const user = await User.findByIdAndUpdate(userId, {
      chatId,
    });
    if (user) {
      bot.sendMessage(
        chatId,
        `👋 Welcome to the Water Tracker bot! I'm here to help you stay hydrated throughout the day. I'll remind you to drink water and provide summaries of your daily intake.\n💧💧💧`
      );
      console.log(`User ${userId} started chat bot`);
    } else {
      sendNotFoundUserBotMsg(bot, chatId);
    }
  } else {
    sendNotFoundUserBotMsg(bot, chatId);
  }
};

module.exports = addTelegramUser;
