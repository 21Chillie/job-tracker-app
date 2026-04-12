import { Hono } from "hono";
import { cors } from "hono/cors";
import logMiddleware from "@middlewares/log.middleware";
import logger from "@config/logger";
import authRoute from "@routes/auth.route";
import { authMigrations } from "@scripts/auth-migrate";
import env from "@config/env";

authMigrations();

const app = new Hono();

app.use(
  "*",
  cors({
    origin: (env.FRONTEND_URL as string) || "http://localhost:5173",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "x-better-auth-origin"],
    exposeHeaders: ["Content-Length", "Set-Cookie"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use("*", logMiddleware);

app.get("/", (c) => {
  logger.info("Hello Hono!");

  return c.text("Hello Hono!");
});

app.route("/api/auth", authRoute);

export default app;
