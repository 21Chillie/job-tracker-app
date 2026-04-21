import api from "@configs/axios-instance.config";
import type { FormJobDataType } from "@hooks/job/useJobFom.hook";
import type {
  JobDataResponse,
  JobsDataResponse,
  QueryJobsParams,
} from "~/types/job.type";

const jobService = {
  newUserJob: async ({
    userId,
    formData,
  }: {
    userId: string;
    formData: FormJobDataType;
  }) => {
    if (!userId) throw new Response("User ID is required");

    const result = await api.post<JobDataResponse>("/api/jobs/new", {
      ...formData,
      userId,
    });

    return result.data;
  },

  getUserJobs: async (cookie?: string, params?: QueryJobsParams) => {
    const response = await api.get<JobsDataResponse>("/api/jobs", {
      params: {
        search: params?.search,
        status: params?.status,
        sortBy: params?.sortBy,
        order: params?.order,
        page: params?.page,
        limit: params?.limit,
      },
      headers: {
        // Forward the user's cookie to the backend
        Cookie: cookie,
      },
    });

    return response.data;
  },
};

export default jobService;
