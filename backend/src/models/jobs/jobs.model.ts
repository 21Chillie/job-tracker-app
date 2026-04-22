import db from "@db/db-client";
import logger from "@config/logger";
import { JobApplicationFormDataType } from "~/types/jobs.types";
import { randomUUIDv7 } from "bun";
import { QueryJobType } from "~/types/global.types";

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
			});

			logger.info(`Job created successfully. [${id}, ${userId.slice(0, 10)}...]`);

			return result;
		} catch (err) {
			throw new Error((err as Error).message);
		}
	},

	getUserJob: async ({
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

			logger.info("Getting job data successfully");

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

			logger.error(`Database error: ${errorMessage}`);
			throw new Error((err as Error).message);
		}
	},
};

export default jobsModel;
