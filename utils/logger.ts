import "dotenv/config";
import winston from "winston";

const isTestEnv = process.env.NODE_ENV === "test";
const isProdEnv = process.env.NODE_ENV === "production";

const transports: winston.transport[] = [
  new winston.transports.File({
    filename: "error.log",
    level: "error",
  }),
  new winston.transports.File({
    filename: "combined.log",
  }),
];

if (!isTestEnv) {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

const logger = winston.createLogger({
  level: isProdEnv ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.errors({ stacks: true }),
    winston.format.splat()
  ),
  defaultMeta: { service: "CARD_VALIDATION_API" },
  transports,
});

export default logger;