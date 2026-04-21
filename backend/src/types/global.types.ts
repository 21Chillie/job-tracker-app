import { Session, User } from "better-auth/types";

export type Variables = {
	user: User;
	session: Session;
};

export type QueryJobType = {
  userId: string
	search: string;
	status: string;
	sortBy: "created_at" | "job_title" | "applied_date";
	order: "asc" | "desc";
	page: string;
	limit: string;
};
