const { User } = require("../../models/user");

const stopBotController = (bot) => {
  bot.onText(/\/stop/, async (msg) => {
    const chatId = msg.chat.id;

    const user = await User.findOneAndUpdate({ chatId }, { chatId: "" });

    if (user) {
      bot.sendMessage(chatId, `👋`);
      console.log(`User ${user._id} stopped chat bot`);
    }
  });
};

module.exports = stopBotController;
