const TelegramBot = require("node-telegram-bot-api");
const cron = require("node-cron");
const sendTelegramNotification = require("./sendTelegramNotification");
const sendTelegramReminder = require("./sendTelegramReminder");
const {
  emptyStartBotController,
  startBotController,
  stopBotController,
} = require("../controllers/telegramBot");

const { TELEGRAM_BOT_TOKEN } = process.env;

const runChatBotServer = () => {
  const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

  emptyStartBotController(bot);
  startBotController(bot);
  stopBotController(bot);

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

  cron.schedule(
    "0 9-21 * * *",
    () => {
      sendTelegramReminder(bot);
    },
    {
      scheduled: true,
      timezone: "Europe/Kiev",
    }
  );
};

module.exports = runChatBotServer;
