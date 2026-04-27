import db from "@config/db-client";
import { logger } from "better-auth";

export const statsModel = {
	comparePerWeek: async (userId: string) => {
		try {
			const result = (await db
				.query(
					"SELECT COUNT(CASE WHEN job.applied_date >= DATE('now', '-7 days') THEN 1 END) AS current_week, COUNT(CASE WHEN applied_date >= DATE('now', '-14 days') AND applied_date < DATE('now', '-7 days') THEN 1 END) AS last_week FROM job WHERE user_id = $user_id;",
				)
				.get({ user_id: userId })) as { current_week: number; last_week: number };

			logger.info(`Getting comparison per week data successfully. [${userId.slice(0, 10)}...,]`);
			return result;
		} catch (err) {
			throw new Error(`${(err as Error).message}. [DATABASE_ERROR_STATS]`);
		}
	},

	totalJobs: async (userId: string) => {
		try {
			const result = db
				.query(
					`
					SELECT COUNT(*) AS jobs_count
					FROM job
					WHERE user_id = $user_id;
					`,
				)
				.get({ user_id: userId }) as { jobs_count: number };

			return result.jobs_count;
		} catch (err) {
			throw new Error(`${(err as Error).message}. [DATABASE_ERROR_STATS]`);
		}
	},

	totalJobsByApplied: async (userId: string) => {
		try {
			const result = db
				.query(
					`
				SELECT COUNT(*) AS applied_count
				FROM job
				WHERE user_id = $user_id
					AND job_status = 'applied';
				`,
				)
				.get({ user_id: userId }) as { applied_count: number };

			return result.applied_count;
		} catch (err) {
			throw new Error(`${(err as Error).message}. [DATABASE_ERROR_STATS]`);
		}
	},

	totalJobsByTested: async (userId: string) => {
		try {
			const result = (await db
				.query(
					`
				SELECT COUNT(*) AS tested_count
				FROM job
				WHERE user_id = $user_id
					AND job_status = 'tested';
				`,
				)
				.get({ user_id: userId })) as { tested_count: number };

			return result.tested_count;
		} catch (err) {
			throw new Error(`${(err as Error).message}. [DATABASE_ERROR_STATS]`);
		}
	},

	totalJobsByInterviewed: async (userId: string) => {
		try {
			const result = (await db
				.query(
					`
				SELECT COUNT(*) AS interviewed_count
				FROM job
				WHERE user_id = $user_id
					AND job_status = 'interviewed';
				`,
				)
				.get({ user_id: userId })) as { interviewed_count: number };

			return result.interviewed_count;
		} catch (err) {
			throw new Error(`${(err as Error).message}. [DATABASE_ERROR_STATS]`);
		}
	},

	totalJobsByRejected: async (userId: string) => {
		try {
			const result = (await db
				.query(
					`
				SELECT COUNT(*) AS interviewed_count
				FROM job
				WHERE user_id = $user_id
					AND job_status = 'interviewed';
				`,
				)
				.get({ user_id: userId })) as { interviewed_count: number };

			return result.interviewed_count;
		} catch (err) {
			throw new Error(`${(err as Error).message}. [DATABASE_ERROR_STATS]`);
		}
	},

	monthlyStatsChart: async (userId: string) => {
		try {
			const result = db
				.query(
					`
					SELECT job_status, applied_date
					FROM job
					WHERE user_id = $user_id
						AND applied_date >= DATE('now', '-28 days');
					`,
				)
				.all({ user_id: userId }) as { job_status: string; applied_date: string }[];

			logger.info(`Getting monthly chart data successfully. [${userId.slice(0, 10)}...,]`);
			return result;
		} catch (err) {
			throw new Error(`${(err as Error).message}. [DATABASE_ERROR_STATS]`);
		}
	},
};
