import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import jobsModel from "~/models/jobs/jobs.model";
import { QueryJobType, Variables } from "~/types/global.types";
import type { JobApplicationFormDataType } from "~/types/jobs.types";

export const jobsController = {
	create: async (c: Context<{ Variables: Variables }>) => {
		const user = c.get("user");
		const formData = await c.req.json<JobApplicationFormDataType>();

		if (user.id !== formData.userId) {
			throw new HTTPException(400, {
				message: "user id from client does not match with user id in server",
			});
		}

		const data = await jobsModel.create(formData);

		return c.json({ success: true, data: { job: data } }, 201);
	},
	getJobData: async (c: Context<{ Variables: Variables }>) => {
		const user = c.get("user");
		const query = c.req.query() as QueryJobType;

		const data = await jobsModel.getUserJob({ ...query, userId: user.id });

		return c.json({ success: true, data }, 200);
	},
};
