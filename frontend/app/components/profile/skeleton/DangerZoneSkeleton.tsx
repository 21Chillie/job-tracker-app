export function DangerZoneSkeleton() {
  return (
    <section className="animate-pulse px-4 py-4 md:px-6 md:pb-6">
      <div className="bg-base-100 border-base-300 mx-auto max-w-4xl space-y-3 rounded-xl border py-4 shadow-md md:py-6">
        <header className="border-b-base-300 space-y-3 border-b px-4 pb-3 md:px-6">
          <div className="skeleton bg-error/20 h-4 w-24 rounded-md"></div>
          <div className="skeleton h-8 w-40 rounded-md"></div>
          <div className="space-y-1">
            <div className="skeleton h-3 w-full rounded-md"></div>
            <div className="skeleton h-3 w-3/4 rounded-md"></div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6">
          <div className="space-y-2">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-12 w-full rounded-lg"></div>
          </div>
          <div className="flex items-center justify-end">
            <div className="skeleton bg-error/20 h-12 w-32 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
