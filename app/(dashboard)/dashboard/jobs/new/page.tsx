import AddJobContainer from "@/components/job/add-job-container";

export default function JobsNewPage() {
  return (
    <div>
      <header className="space-y-2 mb-3 md:mb-6">
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Curate Opportunity
        </h1>
        <p className="text-muted-foreground text-sm leading-normal text-pretty sm:text-base md:leading-relaxed">
          Keep your momentum going. Enter the role detais to start tracking you
          progress.
        </p>
      </header>

      <AddJobContainer />
    </div>
  );
}
