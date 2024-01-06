const sendNotFoundUserBotMsg = (bot, chatId) => {
  bot.sendMessage(chatId, `Sorry. User is not found.`);
  console.log(`User is not found`);
};

module.exports = sendNotFoundUserBotMsg;
