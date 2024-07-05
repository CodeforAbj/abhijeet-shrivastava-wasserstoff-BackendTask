import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf } = format;
import path from "path";

// Ensure the logs directory exists, or create it if necessary
import fs from "fs";
const logDirectory = path.resolve("src", "logs");

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(logDirectory, "load_balancer.log"),
    }),
  ],
});

export default logger;
