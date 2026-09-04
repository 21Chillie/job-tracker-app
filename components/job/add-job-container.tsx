import AddJobForm from "@/components/job/add-job-form";
import QuickStats from "@/components/job/quick-stats";
import { QuickStatsSkeleton } from "@/components/job/quick-stats-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";

export default async function AddJobContainer() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <CardHeader className="border-b">
            <CardTitle>Application details</CardTitle>
            <CardDescription>
              Fill in the information about the role you are applying to.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <AddJobForm />
          </CardContent>
        </Card>

        <div className="lg:col-span-4">
          <Suspense fallback={<QuickStatsSkeleton />}>
            <QuickStats />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
