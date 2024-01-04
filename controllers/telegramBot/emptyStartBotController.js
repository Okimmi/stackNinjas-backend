const emptyStartBotController = (bot) => {
  bot.onText(/\/start$/, async (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(
      chatId,
      `👋 Hello! To get started and access all the features, please use the provided link on our website. Cheers!`
    );
  });
};

module.exports = emptyStartBotController;
