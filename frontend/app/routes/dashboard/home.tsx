import MonthlyBarChart from "@components/home/BarChart";
import JobStatsGrid from "@components/home/JobStatsGrid";
import { getQueryClient } from "@configs/query-client.config";
import {
  monthlyChartQueryOption,
  statsQueryOption,
} from "@hooks/stat/useStats.hook";
import { dehydrate } from "@tanstack/react-query";
import { redirect } from "react-router";
import type { Route } from "./+types/home";

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

export default function Home() {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl space-y-4 p-4 max-sm:mb-4 md:space-y-6 md:p-6">
        <MonthlyBarChart />
        <JobStatsGrid />
      </div>
    </>
  );
}
