import z from "zod";

export const JobFormSchema = z.object({
  fJobTitle: z.string().min(1, "Job title is required").max(100),
  fCompany: z.string().min(1, "Company name is required"),
  fJobUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  fJobStatus: z.enum([
    "applied",
    "tested",
    "interviewed",
    "offer",
    "accepted",
    "rejected",
  ]),
  fAppliedDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  fNotes: z.string().max(500).optional(),
});

export type JobApplicationFormDataType = z.infer<typeof JobFormSchema>;
