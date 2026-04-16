import { Context } from "hono";
import jobsModel from "~/models/jobs/jobs.model";
import { Variables } from "~/types/global.types";
import type { JobApplicationFormDataType } from "~/types/jobs.types";

export const jobsController = {
  create: async (c: Context<{ Variables: Variables }>) => {
    const user = c.get("user");
    const formData = await c.req.json<JobApplicationFormDataType>();

    const data = await jobsModel.create(user.id, formData);

    return c.json({ success: true, data }, 201);
  },
};
