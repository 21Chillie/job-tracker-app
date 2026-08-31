import {
  ApplicationStatus,
  PositionTypeOption,
} from "@/prisma/generated/prisma/enums";
import z from "zod";

export const jobFormSchema = z.object({
  jobTitle: z.string().min(1, { error: "Job title field is required" }),
  positionType: z.enum(PositionTypeOption),
  company: z.string().min(1, { error: "Company field is required" }),
  location: z.string().optional().or(z.literal("")),
  jobUrl: z.url().optional().or(z.literal("")),
  status: z.enum(ApplicationStatus),
  dateApplied: z.nullable(z.date()),
  notes: z.string().optional().or(z.literal("")),
});

export const PositionTypeOptions = Object.entries(PositionTypeOption).map(
  ([label, value]) => ({ label, value }),
);

export const ApplicationStatusOptions = Object.entries(ApplicationStatus).map(
  ([label, value]) => ({ label, value }),
);

export type JobFormSchemaType = z.infer<typeof jobFormSchema>;
