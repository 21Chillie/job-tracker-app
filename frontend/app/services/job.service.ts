import api from "@configs/axios-instance.config";
import type { FormJobDataType } from "@hooks/job/useJobForm.hook";
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
        ...(cookie && { Cookie: cookie }),
      },
    });

    return response.data;
  },

  deleteJob: async ({ userId, jobId }: { userId: string; jobId: string }) => {
    if (!userId || !jobId)
      throw new Response("User ID or Job ID not found for deleting job data", {
        status: 400,
        statusText: "Bad Request",
      });

    const response = await api.delete<JobDataResponse>("/api/jobs/delete", {
      data: {
        userId,
        jobId,
      },
    });

    return response.data;
  },

  updateJob: async (
    formData: FormJobDataType & { id: string; userId: string },
  ) => {
    if (!formData.userId || !formData.id) {
      throw new Response("User ID or Job ID not found for updating job data", {
        status: 400,
        statusText: "Bad Request",
      });
    }

    const response = await api.patch<JobDataResponse>("/api/jobs/update", {
      ...formData,
    });

    return response.data;
  },
};

export default jobService;
