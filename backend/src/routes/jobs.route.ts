import { Hono } from "hono";
import { checkAuth } from "@middlewares/check-auth.middleware";
import { Variables } from "~/types/global.types";
import { zValidator } from "@hono/zod-validator";
import { JobFormSchema } from "~/types/jobs.types";
import { HTTPException } from "hono/http-exception";
import { jobsController } from "@controllers/jobs.controller";
import { generalLimiter } from "@middlewares/rateLimiter.middleware";

// Base url is /api/jobs

const jobsRoute = new Hono<{ Variables: Variables }>();

jobsRoute.use("/*", checkAuth, generalLimiter);

// TODO: Add validation for query parameters
jobsRoute.get("/", jobsController.getJobData);

jobsRoute.post(
	"/new",
	zValidator("json", JobFormSchema, (result) => {
		if (!result.success) {
			throw new HTTPException(400, { message: result.error.message });
		}
	}),
	jobsController.create,
);

export default jobsRoute;
