export function AddJobFormSkeleton() {
  return (
    <section
      id="section-job-form-skeleton"
      className="animate-pulse p-4 md:p-6"
    >
      <div className="bg-base-100 border-base-300 mx-auto max-w-4xl space-y-3 rounded-xl border py-4 shadow-md md:py-6">
        <header className="border-b-base-300 space-y-2 border-b px-4 pb-3 md:px-6">
          <div className="skeleton h-5 w-20 rounded-full bg-primary/15"></div>
          <div className="skeleton h-8 w-64 rounded-md"></div>
          <div className="skeleton h-4 w-full max-w-md rounded-md"></div>{" "}
        </header>

        <div className="grid grid-cols-2 gap-3 px-4 md:px-6">
          <div className="col-span-2 space-y-2">
            <div className="skeleton h-4 w-16 rounded"></div>
            <div className="skeleton h-10 w-full rounded-lg md:h-12"></div>
            <div className="skeleton h-3 w-16 rounded"></div>
          </div>

          <div className="col-span-2 space-y-2 md:col-span-1">
            <div className="skeleton h-4 w-16 rounded"></div>
            <div className="skeleton h-10 w-full rounded-lg md:h-12"></div>
            <div className="skeleton h-3 w-16 rounded"></div>
          </div>

          <div className="col-span-2 space-y-2 md:col-span-1">
            <div className="skeleton h-4 w-32 rounded"></div>
            <div className="skeleton h-10 w-full rounded-lg md:h-12"></div>
          </div>

          <div className="col-span-2 space-y-2 md:col-span-1">
            <div className="skeleton h-4 w-16 rounded"></div>
            <div className="skeleton h-10 w-full rounded-lg md:h-12"></div>
          </div>

          <div className="col-span-2 space-y-2 md:col-span-1">
            <div className="skeleton h-4 w-32 rounded"></div>
            <div className="skeleton h-10 w-full rounded-lg md:h-12"></div>
          </div>

          <div className="col-span-2 space-y-2">
            <div className="skeleton h-4 w-16 rounded"></div>
            <div className="skeleton h-32 w-full rounded-lg"></div>
            <div className="skeleton h-3 w-32 rounded"></div>
          </div>

          <div className="col-span-2 mt-6 flex justify-end gap-4">
            <div className="skeleton h-10 w-20 rounded-lg"></div>{" "}
            <div className="skeleton h-10 w-40 rounded-lg bg-primary/15"></div>{" "}
          </div>
        </div>
      </div>
    </section>
  );
}
