import AddJobForm from "@components/job-page/AddJobForm";
import api from "@configs/axios-instance.config";
import toast from "react-hot-toast";
import type {
  JobsApiResponse,
  JobsApplicationFormType,
} from "~/types/job.type";
import type { Route } from "./+types/add-job";

export default function AddJob() {
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
  ) as unknown as JobsApplicationFormType;

  if (!payload) {
    toast.error("Please fill in all fields");
    return { data: null };
  }

  // Change this later using tanstack query
  const result = await api.post<JobsApiResponse>("/api/jobs/new", payload);

  if (result.data.success) {
    toast.success("Job added successfully");
  }

  return { data: payload };
}
