import z from "zod";

export const JobFormSchema = z.object({
	position: z.string().min(1, { error: "You must provide value for position field" }),
	company: z.string().min(1, { error: "You must provide value for company field" }),
	jobUrl: z.url({ error: "Invalid URL address" }).optional().or(z.literal("")),
	status: z.enum(["applied", "tested", "interviewed", "offer", "accepted", "rejected"], {
		error: "Invalid status value",
	}),
	appliedDate: z.iso.date({ error: "Invalid date format (YYYY-MM-DD)" }).optional().or(z.literal("")),
	notes: z.string().max(500).optional().or(z.literal("")),
});

export type JobApplicationFormDataType = z.infer<typeof JobFormSchema>;
