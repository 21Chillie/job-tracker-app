import { getQueryClient } from "@configs/query-client.config";
import { jobsDataOption } from "@hooks/job/useJobData.hook";
import { dehydrate, HydrationBoundary, useQuery } from "@tanstack/react-query";
import { redirect } from "react-router";
import type { Route } from "./+types/job-list";
import { lazy, Suspense } from "react";

const JobTable = lazy(() => import("@components/job-page/job-list/JobTable"));

export async function loader({ request }: Route.LoaderArgs) {
  const queryClient = getQueryClient();
  const cookie = request.headers.get("cookie") || "";

  if (!cookie) {
    return redirect("/login");
  }

  await queryClient.prefetchQuery(jobsDataOption(cookie, undefined));

  return {
    dehydratedState: dehydrate(queryClient),
  };
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

export default function JobList({ loaderData }: Route.ComponentProps) {
  const { isFetching, data } = useQuery(jobsDataOption());

  if (!data) {
    return null;
  }

  return (
    <>
      <HydrationBoundary state={loaderData.dehydratedState}>
        <Suspense
          fallback={
            <div className="relative">
              <div className="absolute inset-y-100 flex w-full items-center justify-center">
                <p className="skeleton skeleton-text w-fit font-medium">
                  Getting job data from server, please be patient...
                </p>
              </div>
            </div>
          }
        >
          <JobTable {...data} />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
