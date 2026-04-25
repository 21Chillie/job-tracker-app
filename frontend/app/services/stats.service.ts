import api from "@configs/axios-instance.config";
import type {
  MonthlyChartDataResponse,
  UserStatsDataResponse,
} from "~/types/stat.type";

const statsService = {
  getUserStats: async (cookie?: string) => {
    const response = await api.get<UserStatsDataResponse>("/api/stats", {
      headers: {
        // Forward the user's cookie to the backend
        Cookie: cookie,
      },
    });
    return response.data;
  },

  getUserMonthlyChart: async (cookie?: string) => {
    const response = await api.get<MonthlyChartDataResponse>(
      "/api/stats/monthly-chart",
      {
        headers: {
          // Forward the user's cookie to the backend
          Cookie: cookie,
        },
      },
    );

    return response.data;
  },
};

export default statsService;
