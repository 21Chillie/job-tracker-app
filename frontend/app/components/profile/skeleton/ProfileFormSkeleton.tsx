export function ProfileFormSkeleton() {
  return (
    <>
      <section className="animate-pulse p-4 md:p-6">
        <div className="bg-base-100 border-base-300 mx-auto max-w-4xl space-y-3 rounded-xl border py-4 shadow-md md:py-6">
          {/* Header Skeleton */}
          <header className="border-b-base-300 space-y-3 border-b px-4 pb-3 md:px-6">
            <div className="skeleton h-4 w-16 rounded-md bg-primary/15"></div>
            <div className="skeleton h-8 w-48 rounded-md"></div>
            <div className="skeleton h-4 w-full rounded-md"></div>
          </header>

          <div className="grid grid-cols-2 gap-4 px-4 md:px-6">
            {/* Full Name & Email Skeletons */}
            <div className="col-span-2 space-y-2">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-12 w-full rounded-lg"></div>
            </div>
            <div className="col-span-2 space-y-2">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-12 w-full rounded-lg"></div>
            </div>

            {/* Password Skeletons */}
            <div className="col-span-2 space-y-2 md:col-span-1">
              <div className="skeleton h-4 w-32"></div>
              <div className="skeleton h-12 w-full rounded-lg"></div>
            </div>
            <div className="col-span-2 space-y-2 md:col-span-1">
              <div className="skeleton h-4 w-32"></div>
              <div className="skeleton h-12 w-full rounded-lg"></div>
            </div>

            {/* Avatar Circles */}
            <div className="col-span-2 space-y-3">
              <div className="skeleton h-4 w-20"></div>
              <div className="flex flex-wrap gap-3">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="skeleton h-12 w-12 shrink-0 rounded-full md:h-16 md:w-16"
                  ></div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="col-span-2 mt-6 flex justify-end gap-4">
              <div className="skeleton h-12 w-24 rounded-lg"></div>
              <div className="skeleton h-12 w-32 rounded-lg bg-primary/15"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
