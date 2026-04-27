import db from "@config/db-client";
import logger from "@config/logger";
import { randomUUIDv7 } from "bun";
import { HTTPException } from "hono/http-exception";
import { QueryJobType } from "~/types/global.types";
import { JobApplicationFormDataType, JobDataType } from "~/types/jobs.types";

const jobsModel = {
	create: async (data: JobApplicationFormDataType) => {
		const id = randomUUIDv7();
		const { userId, position, company, jobUrl, status, appliedDate, notes } = data;

		const query = db.query(
			"INSERT INTO job (id, user_id, job_title, company, job_url, job_status, applied_date, notes) VALUES ($id, $user_id, $job_title, $company, $job_url, $job_status, $applied_date, $notes) RETURNING *;",
		);

		try {
			const result = query.get({
				id,
				user_id: userId,
				job_title: position,
				company: company,
				job_url: jobUrl || null,
				job_status: status,
				applied_date: appliedDate || null,
				notes: notes || null,
			}) as JobDataType;

			logger.info(`Job created successfully. [${id}, ${userId.slice(0, 10)}...]`);

			return result;
		} catch (err) {
			// logger.error(`Database Error: ${(err as Error).message}`);
			throw new Error(`${(err as Error).message}. [DATABASE_ERROR_JOB]`);
		}
	},

	getUserJobs: async ({
		userId,
		search,
		status = "all",
		sortBy = "applied_date",
		order = "desc",
		page = "1",
		limit = "13",
	}: QueryJobType) => {
		// pagination
		const currentPage = Math.max(1, parseInt(page));
		const pageSize = Math.max(1, Math.min(100, parseInt(limit)));
		const offset = (currentPage - 1) * pageSize;

		// sorting
		const allowedSortFields = ["job_title", "created_at", "applied_date"];
		const sortField = allowedSortFields.includes(sortBy) ? sortBy : "applied_date";
		const sortDir = order.toLowerCase() === "desc" ? "DESC" : "ASC";

		// base query
		let baseQuery = `FROM job WHERE user_id = ?`;
		const params: string[] = [userId];

		// search query
		if (search) {
			baseQuery += ` AND (job_title LIKE ? OR company LIKE ?)`;
			params.push(`%${search}%`, `%${search}%`);
		}

		// filter status
		if (status && status !== "all") {
			baseQuery += ` AND job_status = ?`;
			params.push(status);
		}

		try {
			// count total
			const countQuery = `SELECT COUNT(*) as total ${baseQuery}`;
			const { total } = db.prepare(countQuery).get(...params) as { total: number };

			const jobsDataQuery = `SELECT * ${baseQuery} ORDER BY ${sortField} ${sortDir} LIMIT ? OFFSET ?`;

			const jobs = db.prepare(jobsDataQuery).all(...params, pageSize, offset);

			logger.info(`Getting job data successfully. [${userId.slice(0, 10)}..., total: ${total}]`);

			return {
				jobs,
				meta: {
					total,
					page: currentPage,
					limit: pageSize,
					maxPages: Math.ceil(total / pageSize),
					hasNextPage: currentPage * pageSize < total,
					hasPrevPage: currentPage > 1,
				},
			};
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Something went wrong when trying to get user job data";

			// logger.error(`Database error: ${errorMessage}`);
			throw new Error(`${errorMessage}. [DATABASE_ERROR_JOB]`);
		}
	},

	deleteJob: async ({ userId, jobId }: { userId: string; jobId: string }) => {
		const currentJob = db.prepare("SELECT * FROM job WHERE id = ? AND user_id = ?").get(jobId, userId) as JobDataType;

		if (!currentJob) {
			throw new HTTPException(404, { message: "Job not found or you don't have permission to delete this job data" });
		}

		try {
			const deleteJob = db
				.query("DELETE FROM job WHERE id = $id AND user_id = $user_id RETURNING *;")
				.get({ id: jobId, user_id: userId }) as JobDataType;

			logger.info(`Job deleted successfully. [${jobId}, ${userId.slice(0, 10)}...]`);

			return deleteJob;
		} catch (err) {
			// logger.error(`Database error: ${(err as Error).message}`);
			throw new Error(`${(err as Error).message}. [DATABASE_ERROR_JOB]`);
		}
	},

	updateJob: async (formData: JobApplicationFormDataType & { id: string }) => {
		const currentJob = db
			.prepare("SELECT * FROM job WHERE id = ? AND user_id = ?")
			.get(formData.id, formData.userId) as JobDataType;

		if (!currentJob) {
			throw new HTTPException(404, { message: "Job not found or you don't have permission to update this job data" });
		}

		try {
			const updateJob = db
				.query(
					"UPDATE job SET job_title = $job_title, company = $company, job_url = $job_url, job_status = $job_status, applied_date = $applied_date, notes = $notes, updated_at = CURRENT_TIMESTAMP WHERE id = $id AND user_id = $user_id RETURNING *;",
				)
				.get({
					job_title: formData.position,
					company: formData.company,
					job_url: formData.jobUrl || null,
					job_status: formData.status,
					applied_date: formData.appliedDate || null,
					notes: formData.notes || null,
					id: formData.id,
					user_id: formData.userId,
				}) as JobDataType;

			logger.info(`Job updated successfully. [${formData.id}, ${formData.userId.slice(0, 10)}...]`);

			return updateJob;
		} catch (err) {
			// logger.error(`Database error: ${(err as Error).message}`);
			throw new Error(`${(err as Error).message}. [DATABASE_ERROR_JOB]`);
		}
	},
};

export default jobsModel;
