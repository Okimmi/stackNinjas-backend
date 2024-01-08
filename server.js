const mongoose = require("mongoose");
const app = require("./app");
const runChatBotServer = require("./utils/runChatBotServer");

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Set the write concern without a semicolon
    writeConcern: {
      w: "majority",
      j: true,
    },
  })
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

runChatBotServer();
