import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { type ApplicationStatus } from "@/prisma/generated/prisma/enums";
import { checkSessionRedirect } from "@/services/auth/auth-session.server";
import { userQuickStats } from "@/services/job/job.server";
import { capitalizeString } from "@/utils/global-helper";
import { BadgeCheck } from "lucide-react";

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  APPLIED: "#8b5cf6", // violet
  INTERVIEWING: "#3b82f6", // blue
  ASSESSMENT: "#f59e0b", // amber
  OFFER: "#10b981", // emerald
  ACCEPTED: "#22c55e", // green
  REJECTED: "#ef4444", // red
};

export default async function QuickStats() {
  const session = await checkSessionRedirect();
  const stats = await userQuickStats({ userId: session.id });
  const total = stats.data?.total ?? 0;
  const byStatus = stats.data?.byStatus ?? [];

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Quick stats</CardTitle>

        <CardDescription>
          Your applications stats broken down by status.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <BadgeCheck className="size-4 text-emerald-500" />
          <CardDescription>
            Total Applications:{" "}
            <span className="text-foreground font-medium">
              {stats.data?.total ?? 0}
            </span>
          </CardDescription>
        </div>

        <div className="flex flex-col gap-3">
          {byStatus.map(({ status, count }) => {
            const percentage = (count / total) * 100;

            return (
              <div key={status} className="flex items-center gap-2">
                <span className="w-22 shrink-0">
                  {capitalizeString(status)}
                </span>
                <Progress
                  aria-label={`${capitalizeString(status)} progress bar`}
                  className={`flex-1`}
                  style={
                    {
                      ["--bar-color"]: STATUS_COLORS[status] ?? "#6b7280",
                    } as React.CSSProperties
                  }
                  value={percentage}
                />
                <span className="shrink-0">{count}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
