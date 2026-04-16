import logger from "@config/logger";
import { createMiddleware } from "hono/factory";

const logMiddleware = createMiddleware(async (c, next) => {
  const { method, path } = c.req;
  const start = performance.now();

  // Filter logic to reduce log noise
  const isFavicon = path === "/favicon.ico";
  const isTest = process.env.BUN_ENV === "test";

  await next();

  if (!isFavicon && !isTest) {
    const duration = Math.round(performance.now() - start);
    const status = c.res.status;

    // Stream to Pino
    logger.trace(
      {
        method,
        path,
        status,
        duration: `${duration}ms`,
      },
      `HTTP ${method} ${path}`,
    );
  }
});

export default logMiddleware;
