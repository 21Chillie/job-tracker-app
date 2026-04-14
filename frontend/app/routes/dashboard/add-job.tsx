import AddJobForm from "@components/AddJobForm";
import type { Route } from "./+types/add-job";
import toast from "react-hot-toast";
import type { JobApplicationFormType } from "~/types/job.type";

export default function AddJob({ actionData }: Route.ComponentProps) {
  return (
    <>
      <AddJobForm />
    </>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const payload = Object.fromEntries(
    formData,
  ) as unknown as JobApplicationFormType;

  if (!payload) {
    toast.error("Please fill in all fields");
    return { data: null };
  }

  toast.success("Job added successfully");

  return { data: payload };
}
