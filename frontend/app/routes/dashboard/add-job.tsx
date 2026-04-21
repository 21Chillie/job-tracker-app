import { AddJobFormSkeleton } from "@components/job-page/add-job/AddJobFormSkeleton";
import { getQueryClient } from "@configs/query-client.config";
import { sessionQueryOption } from "@hooks/auth/useSession.hook";
import { jobsDataOption } from "@hooks/job/useJobData.hook";
import type { FormJobDataType } from "@hooks/job/useJobFom.hook";
import jobService from "@services/job.service";
import { Suspense, lazy } from "react";
import toast from "react-hot-toast";
import type { Route } from "./+types/add-job";

const AddJobForm = lazy(
  () => import("@components/job-page/add-job/AddJobForm"),
);

export default function AddJob() {
  return (
    <>
      <Suspense fallback={<AddJobFormSkeleton />}>
        <AddJobForm />
      </Suspense>
    </>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as unknown as FormJobDataType;

  const queryClient = getQueryClient();
  const session = await queryClient.ensureQueryData(sessionQueryOption());

  if (!payload && !session.user) {
    toast.error("Please fill in all fields");
    return { data: null };
  }

  const result = await jobService.newUserJob({
    userId: session?.user.id as string,
    formData: payload,
  });

  if (result.success) {
    toast.success("Job added successfully");

    queryClient.invalidateQueries(jobsDataOption());
  }

  return { data: payload };
}
