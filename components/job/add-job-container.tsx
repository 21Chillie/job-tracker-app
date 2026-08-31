import AddJobForm from "@/components/job/add-job-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddJobContainer() {
  return (
    <div className="flex flex-col gap-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Curate Opportunity
        </h1>
        <p className="text-muted-foreground text-sm leading-normal text-pretty sm:text-base md:leading-relaxed">
          Keep your momentum going. Enter the role detais to start tracking you
          progress.
        </p>
      </header>

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
