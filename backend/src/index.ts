import env from "@config/env";
import logger from "@config/logger";
import { dbShutdown } from "@db/db-client";
import logMiddleware from "@middlewares/log.middleware";
import authRoute from "@routes/auth.route";
import jobsRoute from "@routes/jobs.route";
import statsRoute from "@routes/stats.route";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { runDatabaseMigration } from "./scripts/migrate-database";

runDatabaseMigration();

const app = new Hono();

app.use(
	"*",
	cors({
		origin: [env.FRONTEND_URL as string, "http://localhost:3000", "http://localhost:5173"],
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization", "x-better-auth-origin", "x-requested-with"],
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

app.route("/api/stats", statsRoute);

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

process.on("SIGINT", dbShutdown);
process.on("SIGTERM", dbShutdown);

export default {
	port: 3001,
	hostname: "0.0.0.0",
	fetch: app.fetch,
};
