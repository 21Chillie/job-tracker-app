import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import jobsModel from "~/models/jobs.model";
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
	getJobsData: async (c: Context<{ Variables: Variables }>) => {
		const user = c.get("user");
		const query = c.req.query() as QueryJobType;

		const data = await jobsModel.getUserJobs({ ...query, userId: user.id });

		return c.json({ success: true, data: { jobs: data.jobs, meta: data.meta } }, 200);
	},

	deleteJobData: async (c: Context<{ Variables: Variables }>) => {
		const user = c.get("user");
		const { userId, jobId } = await c.req.json<{ userId: string; jobId: string }>();

		if (user.id !== userId) {
			throw new HTTPException(400, {
				message: "user id from client does not match with user id in server",
			});
		}

		const data = await jobsModel.deleteJob({ userId, jobId });

		return c.json({ success: true, data: { job: data } }, 200);
	},

	updateJobData: async (c: Context<{ Variables: Variables }>) => {
		const user = c.get("user");
		const formData = await c.req.json<JobApplicationFormDataType & { id: string }>();

		if (user.id !== formData.userId) {
			throw new HTTPException(400, {
				message: "user id from client does not match with user id in server",
			});
		}

		const data = await jobsModel.updateJob(formData);

		return c.json({ success: true, data: { job: data } }, 200);
	},
};
