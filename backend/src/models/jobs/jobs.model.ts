import db from "@db/db-client";
import logger from "@config/logger";
import { JobApplicationFormDataType } from "~/types/jobs.types";
import { randomUUIDv7 } from "bun";

const jobsModel = {
	create: async (userId: string, data: JobApplicationFormDataType) => {
		const id = randomUUIDv7();
		const { position, company, jobUrl, status, appliedDate, notes } = data;

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
};

export default jobsModel;
