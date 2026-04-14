import AddJobForm from "@components/AddJobForm";
import type { Route } from "./+types/add-job";
import toast from "react-hot-toast";

export default function AddJob() {
  return (
    <>
      <AddJobForm />
    </>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  if (payload) {
    toast.success("Job added successfully");
  }

  return null;
}
