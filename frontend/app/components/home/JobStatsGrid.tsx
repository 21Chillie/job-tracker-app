import {
  Briefcase,
  Code,
  Send,
  TrendingDown,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import type { UserStatsDataResponse } from "~/types/stat.type";

export default function JobStatsGrid({
  data,
}: {
  data: UserStatsDataResponse;
}) {
  // Direct mapping from your JSON keys to UI properties
  const countJobs = data?.data.countJobs;
  const stats = data?.data.stats;

  const statsConfig = [
    {
      label: "Total",
      value: countJobs?.total,
      icon: Briefcase,
      color: "text-primary",
    },
    {
      label: "Applied",
      value: countJobs?.apply,
      icon: Send,
      color: "text-accent",
    },
    {
      label: "Tested",
      value: countJobs?.test,
      icon: Code,
      color: "text-warning",
    },
    {
      label: "Interviewed",
      value: countJobs?.interview,
      icon: Users,
      color: "text-fuchsia-500",
    },
    {
      label: "Rejected",
      value: countJobs?.reject,
      icon: XCircle,
      color: "text-error",
    },
  ];

  return (
    <section>
      <article className="grid grid-cols-2 gap-4 md:gap-6">
        {statsConfig.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.label === "Total" && "col-span-2"} stat bg-base-100 border-base-300 rounded-2xl border p-4 shadow-sm md:p-6`}
          >
            <div className="mb-4 flex items-center justify-between">
              <div
                className={`bg-base-200 rounded-lg p-2 ${stat.color}`}
                aria-hidden="true"
              >
                <stat.icon className="size-5 md:size-6" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <dt className="text-base-content/60 text-sm font-bold tracking-widest uppercase">
                {stat.label === "Total"
                  ? "Total Active Applications"
                  : stat.label}
              </dt>

              <div className="flex items-baseline gap-2">
                <dd className="text-base-content text-3xl font-black">
                  {stat.value ?? 0}
                </dd>

                {stat.label === "Total" ? null : (
                  <span className="text-base-content/60 text-xs tracking-wider capitalize">
                    Total
                  </span>
                )}

                {stat.label === "Total" ? (
                  stats?.trend === "up" ? (
                    <div className="text-primary flex items-center gap-1">
                      <span>
                        <TrendingUp className="size-4" />
                      </span>

                      <p className="text-sm font-medium">
                        +{stats.percentage || 0}% from last week
                      </p>
                    </div>
                  ) : (
                    <div className="text-error flex items-center gap-1">
                      <span>
                        <TrendingDown className="size-4" />
                      </span>

                      <p className="text-sm font-medium">
                        -{stats?.percentage || 0}% from last month
                      </p>
                    </div>
                  )
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
}
