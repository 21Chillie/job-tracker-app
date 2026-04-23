import { getQueryClient } from "@configs/query-client.config";
import { jobsDataOption } from "@hooks/job/useJobData.hook";
import type { FormJobDataType } from "@hooks/job/useJobForm.hook";
import jobService from "@services/job.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { lazy } from "react";
import toast from "react-hot-toast";
import { redirect } from "react-router";
import type { Route } from "./+types/job-list";

const JobTable = lazy(() => import("@components/job-page/job-list/JobTable"));

export async function loader({ request }: Route.LoaderArgs) {
  const queryClient = getQueryClient();
  const cookie = request.headers.get("cookie") || "";

  if (!cookie) {
    return redirect("/login");
  }

  // Prefetch user jobs data with cookie, to prevent failed to check user session
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
  return (
    <>
      <HydrationBoundary state={loaderData.dehydratedState}>
        <JobTable />
      </HydrationBoundary>
    </>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const queryClient = getQueryClient();
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as FormJobDataType & {
    id: string;
    userId: string;
  };

  if (!payload.id || !payload.userId) {
    return toast.error("User ID or Job ID not found for updating job data");
  }

  try {
    const updateJob = await jobService.updateJob(payload);

    if (updateJob.success) {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job update successfully");
    }

    return { data: updateJob };
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Something went wrong while trying to update job data";

    toast.error(errorMessage);
    return { error: errorMessage };
  }
}
