import { jobsController } from "@controllers/jobs.controller";
import { zValidator } from "@hono/zod-validator";
import { checkAuth } from "@middlewares/check-auth.middleware";
import { generalLimiter } from "@middlewares/rateLimiter.middleware";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import z from "zod";
import { Variables } from "~/types/global.types";
import { deleteFormSchema, JobFormSchema } from "~/types/jobs.types";

// Base url is /api/jobs

const jobsRoute = new Hono<{ Variables: Variables }>();

jobsRoute.use("/*", checkAuth, generalLimiter);

jobsRoute.get("/", jobsController.getJobsData);

jobsRoute.post(
	"/new",
	zValidator("json", JobFormSchema, (result) => {
		if (!result.success) {
			throw new HTTPException(400, { message: result.error.message });
		}
	}),
	jobsController.create,
);

jobsRoute.delete(
	"/delete",
	zValidator("json", deleteFormSchema, (result) => {
		if (!result.success) throw new HTTPException(400, { message: z.prettifyError(result.error) });
	}),
	jobsController.deleteJobData,
);

jobsRoute.patch(
	"/update",
	zValidator(
		"json",
		JobFormSchema.extend({ id: z.string().min(1, { error: "Job id is required to update job data" }) }),
		(result) => {
			if (!result.success) {
				throw new HTTPException(400, { message: z.prettifyError(result.error) });
			}
		},
	),

	jobsController.updateJobData,
);

export default jobsRoute;
