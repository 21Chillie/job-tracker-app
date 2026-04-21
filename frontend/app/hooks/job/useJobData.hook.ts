import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import jobService from "~/services/job.service";
import type { QueryJobsParams } from "~/types/job.type";

export function jobsDataOption(cookie?: string, params?: QueryJobsParams) {
  return queryOptions({
    queryKey: ["jobs", params],
    queryFn: async () => {
      const response = await jobService.getUserJobs(cookie, params);

      return response;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });
}
