const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./routes/api/auth");
const aquatrackRouter = require("./routes/api/aquatrack");
const hydrationEntriesRouter = require("./routes/api/hydrationEntries");
const swaggerRouter = require("./routes/api/swagger");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Render use it to monitor this app and for zero downtime deploys.
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api/auth", authRouter);
app.use("/api/aquatrack", aquatrackRouter);
app.use("/api/hydration-entries", hydrationEntriesRouter);
app.use("/api/api-docs", swaggerRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});
app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

module.exports = app;
