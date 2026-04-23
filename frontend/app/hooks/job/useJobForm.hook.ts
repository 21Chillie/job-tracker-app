import { getQueryClient } from "@configs/query-client.config";
import jobService from "@services/job.service";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useFetcher } from "react-router";
import z from "zod";

export const formJobSchema = z.object({
  position: z
    .string()
    .min(1, { error: "You must provide value for position field" }),
  company: z
    .string()
    .min(1, { error: "You must provide value for company field" }),
  jobUrl: z.url({ error: "Invalid URL address" }).optional().or(z.literal("")),
  status: z.enum(
    ["applied", "tested", "interviewed", "offer", "accepted", "rejected"],
    { error: "Invalid status value" },
  ),
  appliedDate: z.iso
    .date({ error: "Invalid date format (YYYY-MM-DD)" })
    .optional()
    .or(z.literal("")),
  notes: z
    .string()
    .max(500, {
      error: "Your notes value is exceed the maximum length of 500 characters",
    })
    .optional()
    .or(z.literal("")),
});

export type FormJobDataType = z.infer<typeof formJobSchema>;

export function useJobForm() {
  const fetcher = useFetcher();
  const todayDate = new Date().toISOString().split("T")[0];

  const formDefaultValues: FormJobDataType = {
    position: "",
    company: "",
    jobUrl: "",
    status: "applied",
    appliedDate: todayDate,
    notes: "",
  };

  const { handleSubmit, Field, Subscribe, reset } = useForm({
    defaultValues: formDefaultValues,
    validators: {
      onSubmit: formJobSchema,
    },
    onSubmit: async ({ value }) => {
      fetcher.submit(value, { method: "POST" });
      reset();
    },
  });

  return { handleSubmit, Field, Subscribe, reset };
}

export function useEditJobForm({
  id,
  userId,
  position,
  company,
  jobUrl,
  status,
  appliedDate,
  notes,
}: FormJobDataType & { id: string; userId: string }) {
  const fetcher = useFetcher();

  const formDefaultValues: FormJobDataType & { id: string; userId: string } = {
    id,
    userId,
    position,
    company,
    jobUrl,
    status,
    appliedDate,
    notes,
  };

  const { handleSubmit, Field, Subscribe, reset } = useForm({
    defaultValues: formDefaultValues,
    validators: {
      onSubmit: formJobSchema.extend({
        id: z.string().min(1, { message: "Job id is required to edit job" }),
        userId: z
          .string()
          .min(1, { message: "user id is required to edit job" }),
      }),
    },
    onSubmit: async ({ value }) => {
      fetcher.submit(value, { method: "POST" });
    },
  });

  return { handleSubmit, Field, Subscribe, reset };
}

export function useJobDelete({
  userId,
  jobId,
}: {
  userId: string;
  jobId: string;
}) {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: () => jobService.deleteJob({ userId, jobId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job deleted successfully");
    },
    onError: (err) => {
      toast.error(`Delete failed: ${err.message}`);
    },
  });
}
