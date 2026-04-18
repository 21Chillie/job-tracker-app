import { Context } from "hono";
import { rateLimiter } from "hono-rate-limiter";
import { HTTPException } from "hono/http-exception";
import env from "@config/env";
import { Variables } from "~/types/global.types";

export const generalLimiter = rateLimiter({
	windowMs: 1000 * 60 * 10, // 10 minutes
	limit: env.BUN_APP_ENV === "development" ? 10000 : 300, // limit each user or ip to X request per window
	standardHeaders: "draft-7", // send X-RateLimit headers
	keyGenerator: (c: Context<{ Variables: Variables }>) => {
		const user = c.get("user");

		// use user id as key, else use ip address
		if (user?.id) {
			return `user ${user.id}`;
		}

		return c.req.header("x-forwarder-for") || "anonymous";
	},
	handler: () => {
		throw new HTTPException(429, {
			message: "Too many request, please try again later",
		});
	},
});

export const authLimiter = rateLimiter({
	windowMs: 1000 * 60 * 30, // 30 minutes
	limit: env.BUN_APP_ENV === "development" ? 1000 : 10,
	standardHeaders: "draft-7",
	keyGenerator: () => "anonymous",
	handler: () => {
		throw new HTTPException(429, {
			message: "Too many login attempts, please try again later",
		});
	},
});
