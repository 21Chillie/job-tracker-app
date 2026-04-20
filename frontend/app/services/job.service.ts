import api from "~/configs/axios-instance.config";
import type { FormJobDataType } from "@hooks/job/useJobFom.hook";
import type { JobsApiResponse } from "~/types/job.type";

const jobService = {
  newUserJob: async ({
    userId,
    formData,
  }: {
    userId: string;
    formData: FormJobDataType;
  }) => {
    if (!userId) throw new Response("User ID is required");

    // TODO: need to handle formData validation

    const result = await api.post<JobsApiResponse>("/api/jobs/new", {
      ...formData,
      userId,
    });

    return result.data;
  },
};

export default jobService;
