import JobStatsGrid from "@components/home/JobStatsGrid";
import { getQueryClient } from "@configs/query-client.config";
import {
  monthlyChartQueryOption,
  statsQueryOption,
} from "@hooks/stat/useStats.hook";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { lazy } from "react";
import { redirect, type MetaFunction } from "react-router";
import type { Route } from "./+types/home";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard | Job Tracker - Track Your Career Growth" },
    {
      name: "description",
      content:
        "Manage your job applications, track interview status, and visualize your career progress.",
    },
    { property: "og:title", content: "Dashboard | Job Journey" },
    { property: "og:type", content: "website" },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = request.headers.get("cookie") || "";
  const queryClient = getQueryClient();

  if (!cookie) {
    return redirect("/login");
  }

  await queryClient.prefetchQuery(statsQueryOption(cookie));
  await queryClient.prefetchQuery(monthlyChartQueryOption(cookie));

  return { dehydratedState: dehydrate(queryClient) };
}

let isInitialRequest = true;

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  if (isInitialRequest) {
    isInitialRequest = false;
    return await serverLoader();
  }
  // Prevent calling the server loader during client-side search/navigation
  return { dehydratedState: undefined };
}

clientLoader.hydrate = true as const;

const MonthlyBarChart = lazy(() => import("@components/home/BarChart"));

export default function Home() {
  const { data: stats, isLoading: statsLoading } = useQuery(statsQueryOption());
  const { data: chart, isLoading: chartLoading } = useQuery(
    monthlyChartQueryOption(),
  );

  return (
    <>
      <div className="mx-auto w-full max-w-7xl space-y-4 p-4 max-sm:mb-4 md:space-y-6 md:p-6">
        {/* Chart Logic */}
        {chartLoading || !chart ? (
          <div className="bg-base-100 grid h-[40vh] w-full place-items-center rounded-xl p-6 md:max-h-[30vh]">
            <div className="flex w-full items-center justify-center">
              <p className="skeleton skeleton-text w-fit font-medium">
                Generating monthly career overview data, please be patient...
              </p>
            </div>
          </div>
        ) : (
          <MonthlyBarChart chart={chart} />
        )}

        {/* Stats Logic */}
        {statsLoading || !stats ? (
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {[...Array(5)].map((_, i) =>
              i === 0 ? (
                <div
                  key={i}
                  className="skeleton bg-base-100 border-base-300 col-span-2 h-32 w-full rounded-2xl border"
                />
              ) : (
                <div
                  key={i}
                  className="skeleton bg-base-100 border-base-300 h-32 w-full rounded-2xl border"
                />
              ),
            )}
          </div>
        ) : (
          <JobStatsGrid data={stats} />
        )}
      </div>
    </>
  );
}
