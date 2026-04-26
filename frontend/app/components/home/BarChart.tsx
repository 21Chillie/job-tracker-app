import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonthlyChartDataResponse } from "~/types/stat.type";

const STATUS_CONFIG = [
  {
    key: "applied",
    label: "Applied",
    color: "var(--color-accent)",
  },
  {
    key: "tested",
    label: "Tested",
    color: "var(--color-warning)",
  },
  {
    key: "interviewed",
    label: "Interviewed",
    color: "var(--color-fuchsia-400)",
  },
  {
    key: "rejected",
    label: "Rejected",
    color: "var(--color-error)",
  },
];

function MonthlyBarChart({
  isAnimationActive = true,
  chart,
}: {
  isAnimationActive?: boolean;
  chart: MonthlyChartDataResponse;
}) {
  const chartData = chart?.data.monthlyChart || [];

  const date = new Date();
  const currentMonthYear = date
    .toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
    .replace(" ", ", ");

  return (
    <section
      id="monthly-overview"
      className="bg-base-100 border-base-300 rounded-xl border shadow-xl md:p-6"
    >
      <header className="mb-4 flex items-center justify-between max-sm:p-4">
        <h3 className="text-xl font-bold">Monthly Overview</h3>
        <p className="text-base-content/70 text-sm font-medium">
          {currentMonthYear}
        </p>
      </header>

      <BarChart
        className="aspect-video h-full max-h-[40vh] w-full max-sm:pr-4 md:max-h-[30vh]"
        responsive
        data={chartData}
        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--color-base-content)"
          strokeOpacity={0.2}
        />

        <XAxis
          dataKey="week"
          tick={{ fill: "var(--color-base-content)", opacity: 0.7 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          width={40}
          tick={{ fill: "var(--color-base-content)", opacity: 0.7 }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />

        <Tooltip
          cursor={{ fill: "var(--color-base-content)", opacity: 0.05 }}
          contentStyle={{
            backgroundColor: "var(--color-base-100)",
            borderColor: "var(--color-base-300)",
            borderRadius: "var(--radius-box, 1rem)",
            color: "var(--color-base-content)",
            fontSize: "12px",
            fontWeight: "600",
          }}
        />

        <Legend
          wrapperStyle={{
            fontSize: "12px",
            fontWeight: "600",
            textTransform: "capitalize",
          }}
          verticalAlign="top"
          align="right"
          iconType="circle"
          iconSize={6}
        />

        {STATUS_CONFIG.map((status) => (
          <Bar
            className=""
            key={status.key}
            dataKey={status.key}
            name={status.label}
            fill={status.color}
            activeBar={{
              fill: status.color,
              stroke: status.color,
              fillOpacity: 0.7,
            }}
            radius={[10, 10, 0, 0]}
            isAnimationActive={isAnimationActive}
          />
        ))}
      </BarChart>
    </section>
  );
}

export default MonthlyBarChart;
