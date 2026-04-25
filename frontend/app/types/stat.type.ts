export type MonthlyChartDataType = {
  week: string;
  applied: number;
  tested: number;
  interviewed: number;
  rejected: number;
};

export type MonthlyChartDataResponse = {
  success: boolean;
  data: {
    monthlyChart: MonthlyChartDataType[];
  };
};

export type CountJobsDataType = {
  total: number;
  apply: number;
  test: number;
  interview: number;
  reject: number;
};

export type StatsDataType = {
  currentWeek: number;
  lastWeek: number;
  percentage: number;
  trend: "up" | "down";
};

export type UserStatsDataResponse = {
  success: boolean;
  data: {
    countJobs: CountJobsDataType;
    stats: StatsDataType;
  };
};
