import { Context } from "hono";
import { statsModel } from "~/models/stats.model";
import { Variables } from "~/types/global.types";

export const statsController = {
	totalJobsPerWeek: async (c: Context<{ Variables: Variables }>) => {
		const user = c.get("user");

		const totalJobs = await statsModel.comparePerWeek(user.id);
		const currentWeek = totalJobs.current_week || 0;
		const lastWeek = totalJobs.last_week || 0;

		let percentageChange = 0;

		// 1. Calculate percentage change correctly
		if (lastWeek > 0) {
			percentageChange = ((currentWeek - lastWeek) / lastWeek) * 100;
		} else if (currentWeek > 0) {
			// If last week was 0 and this week is > 0, it's a 100% growth start
			percentageChange = 100;
		} else {
			percentageChange = 0;
		}

		const countJobs = {
			total: await statsModel.totalJobs(user.id),
			apply: await statsModel.totalJobsByApplied(user.id),
			test: await statsModel.totalJobsByTested(user.id),
			interview: await statsModel.totalJobsByInterviewed(user.id),
			reject: await statsModel.totalJobsByRejected(user.id),
		};

		return c.json(
			{
				success: true,
				data: {
					countJobs,
					stats: {
						currentWeek,
						lastWeek,
						percentage: Math.round(Math.abs(percentageChange)),
						trend: currentWeek >= lastWeek ? "up" : "down",
					},
				},
			},
			200,
		);
	},
};
