import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

export default app;
