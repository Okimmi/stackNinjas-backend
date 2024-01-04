const mongoose = require("mongoose");
const app = require("./app");
const TelegramBot = require("node-telegram-bot-api");
const cron = require("node-cron");
const sendTelegramNotification = require("./utils/sendTelegramNotification");
const { User } = require("./models/user");

const { DB_HOST, PORT, TELEGRAM_BOT_TOKEN } = process.env;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT || 3000, () => {
      console.log(`Server running. Use our API on port: ${PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

bot.onText(/\/start (.+)/, async (msg, match) => {
  const userId = msg.from.id;
  const commandParam = match[1];

  await User.findByIdAndUpdate(commandParam, { chatId: userId });
  console.log(`User ${commandParam} started bot`);
});

bot.onText(/\/stop/, async (msg) => {
  const chatId = msg.chat.id;

  const user = await User.findOneAndUpdate({ chatId }, { chatId: null });

  if (user) {
    console.log(`User ${user._id} stopped bot`);
  }
});

cron.schedule(
  "0 19 * * *",
  () => {
    sendTelegramNotification(bot);
  },
  {
    scheduled: true,
    timezone: "Europe/Kiev",
  }
);
