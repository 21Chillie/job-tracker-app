import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import logMiddleware from "@middlewares/log.middleware";
import env from "@config/env";
import logger from "@config/logger";
import { authMigrations } from "@scripts/auth-migrate";
import { jobsMigrations } from "@scripts/jobs-migrate";
import authRoute from "@routes/auth.route";
import jobsRoute from "@routes/jobs.route";

authMigrations();
jobsMigrations();

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
  return c.json({ message: "Hello from Hono!" });
});

app.route("/api/auth", authRoute);

app.route("/api/jobs", jobsRoute);

// Handle global error response
app.onError((err, c) => {
  const status = err instanceof HTTPException ? err.status : 500;

  if (env.BUN_APP_ENV === "development") {
    console.error(err.stack);
  }

  logger.error(`${err.name}: ${err.message}`);

  return c.json(
    {
      success: false,
      error: {
        type: err.name || "InternalError",
        message: err.message || "An unexpected error occurred",
        stack: env.BUN_APP_ENV === "development" ? err.stack : undefined,
      },
    },
    status,
  );
});

export default app;
