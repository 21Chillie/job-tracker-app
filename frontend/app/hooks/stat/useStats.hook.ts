import statsService from "@services/stats.service";
import { queryOptions } from "@tanstack/react-query";

export function statsQueryOption(cookie?: string) {
  return queryOptions({
    queryKey: ["stat"],
    queryFn: async () => {
      const response = await statsService.getUserStats(cookie);
      return response;
    },

    staleTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function monthlyChartQueryOption(cookie?: string) {
  return queryOptions({
    queryKey: ["stat", "monthly-chart"],
    queryFn: async () => {
      const response = await statsService.getUserMonthlyChart(cookie);
      return response;
    },

    staleTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
