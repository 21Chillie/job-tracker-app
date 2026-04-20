import AddJobForm from "@components/job-page/add-job/AddJobForm";
import toast from "react-hot-toast";
import type { Route } from "./+types/add-job";
import type { FormJobDataType } from "@hooks/job/useJobFom.hook";
import jobService from "@services/job.service";
import { sessionQueryOption } from "@hooks/auth/useSession.hook";
import { getQueryClient } from "@configs/query-client.config";

export default function AddJob() {
  return (
    <>
      <AddJobForm />
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

    // TODO: you need to invalidate job cache after adding new
    // queryClient.invalidateQueries();
  }

  return { data: payload };
}
