import { pino } from "pino";
import env from "./env";

const isDevelopment = env.BUN_APP_ENV === "development";

const logger = pino({
  level: isDevelopment ? "trace" : "info",
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    targets: [
      {
        target: "pino-pretty",
        level: isDevelopment ? "trace" : "info",
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
          limit: { count: 1 },
          size: "30m",
        },
      },
    ],
  },
});

export default logger;
