import { AddJobFormSkeleton } from "@components/job-page/add-job/AddJobFormSkeleton";
import { getQueryClient } from "@configs/query-client.config";
import { sessionQueryOption } from "@hooks/auth/useSession.hook";
import type { FormJobDataType } from "@hooks/job/useJobForm.hook";
import jobService from "@services/job.service";
import { Suspense, lazy } from "react";
import toast from "react-hot-toast";
import type { MetaFunction } from "react-router";
import type { Route } from "./+types/add-job";

const AddJobForm = lazy(
  () => import("@components/job-page/add-job/AddJobForm"),
);

export const meta: MetaFunction = () => {
  return [
    { title: "Add New Application | Job Tracker" },
    {
      name: "description",
      content: "Add new curated opportunity to your personal tracker.",
    },
  ];
};

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

    await queryClient.invalidateQueries({ queryKey: ["jobs"] });
    await queryClient.invalidateQueries({ queryKey: ["stat"] });
    await queryClient.invalidateQueries({ queryKey: ["stat", "monthly-chart"] });
  }

  return { data: payload };
}
