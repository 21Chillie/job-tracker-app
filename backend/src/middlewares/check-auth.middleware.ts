import { createMiddleware } from "hono/factory";
import { auth } from "@utils/auth";
import { HTTPException } from "hono/http-exception";
import logger from "~/config/logger";

export const checkAuth = createMiddleware(async (c, next) => {
	// Check user session data
	const session = await auth.api.getSession({
		headers: c.req.raw.headers,
	});

	if (!session) {
		throw new HTTPException(401, {
			message: "User session is not found, please login or create an account",
		});
	}

	c.set("user", session.user);
	c.set("session", session.session);

	logger.debug("User session is found");

	await next();
});
