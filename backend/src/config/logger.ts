import { pino } from "pino";
import env from "./env";

const isProduction = env.BUN_APP_ENV === "production";

const logger = pino({
  level: isProduction ? "info" : "debug",
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    targets: [
      {
        target: "pino-pretty",
        level: isProduction ? "info" : "debug",
        options: { colorize: true },
      },
      {
        target: "pino-roll",
        level: "info",
        options: {
          file: "logs/combined",
          frequency: "daily",
          extension: ".log",
          mkdir: true,
          limit: { count: 7 },
          size: "30m",
        },
      },
    ],
  },
});

export default logger;
