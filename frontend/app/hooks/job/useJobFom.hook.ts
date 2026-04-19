import { useForm } from "@tanstack/react-form";
import { useSubmit } from "react-router";
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
  const submit = useSubmit();
  const todayDate = new Date().toISOString().split("T")[0];

  const formDefaultValues: FormJobDataType = {
    position: "",
    company: "",
    jobUrl: "",
    status: "applied",
    appliedDate: todayDate,
    notes: "",
  };

  const { handleSubmit, Field, Subscribe } = useForm({
    defaultValues: formDefaultValues,
    validators: {
      onSubmit: formJobSchema,
    },
    onSubmit: async ({ value }) => {
      submit(value, { method: "POST" });
    },
  });

  return { handleSubmit, Field, Subscribe };
}
