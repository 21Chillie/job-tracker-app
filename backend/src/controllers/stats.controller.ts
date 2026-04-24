import { Context } from "hono";
import { statsModel } from "~/models/stats.model";
import { Variables } from "~/types/global.types";

export const statsController = {
	getTotalJobsPerWeek: async (c: Context<{ Variables: Variables }>) => {
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

	getMonthlyChartData: async (c: Context<{ Variables: Variables }>) => {
		const user = c.get("user");
		const rows = await statsModel.monthlyStatsChart(user.id);

		// Initialize chart data
		const chartData = [
			{ week: "Week 1", applied: 0, tested: 0, interviewed: 0, rejected: 0 },
			{ week: "Week 2", applied: 0, tested: 0, interviewed: 0, rejected: 0 },
			{ week: "Week 3", applied: 0, tested: 0, interviewed: 0, rejected: 0 },
			{ week: "Week 4", applied: 0, tested: 0, interviewed: 0, rejected: 0 },
		];

		const today = new Date();

		// Map the data into the correct week
		rows.forEach((row) => {
			const appliedDate = new Date(row.applied_date);
			// Calculate how many days ago this job was applied for
			const diffTime = Math.abs(today.getTime() - appliedDate.getTime());
			const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

			// Determine which week bucket it belongs to (0 is Week 4, 1 is Week 3, etc.)
			let weekIndex = -1;
			if (diffDays >= 0 && diffDays <= 6)
				weekIndex = 3; // Days 0-6 ago -> Week 4 (Current)
			else if (diffDays >= 7 && diffDays <= 13)
				weekIndex = 2; // Days 7-13 ago -> Week 3
			else if (diffDays >= 14 && diffDays <= 20)
				weekIndex = 1; // Days 14-20 ago -> Week 2
			else if (diffDays >= 21 && diffDays <= 28) weekIndex = 0; // Days 21-28 ago -> Week 1

			// Increment the specific status count for that week
			if (weekIndex !== -1) {
				const status = row.job_status as keyof Omit<(typeof chartData)[0], "week">;
				if (chartData[weekIndex][status] !== undefined) {
					chartData[weekIndex][status] += 1;
				}
			}
		});

		return c.json({ success: true, data: { monthlyChart: chartData } }, 200);
	},
};
