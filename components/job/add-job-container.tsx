import AddJobForm from "@/components/job/add-job-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
          <Card>
            <CardHeader>
              <CardTitle>Quick stats</CardTitle>

              <CardDescription>
                Your applications stats broken down by status.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
