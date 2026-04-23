import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDebounce } from "use-debounce";
import { useAppDispatch, useAppSelector } from "~/configs/store.config";
import { setNextPage, setPrevPage } from "~/features/job/jobFilterSlice";
import { jobsDataOption } from "~/hooks/job/useJobData.hook";
import Filter from "./Filter";
import { TableRow } from "./TableRow";

export default function JobTable() {
  const filters = useAppSelector((state) => state.jobFilter);
  const [debouncedSearch] = useDebounce(filters.search, 500);
  const dispatch = useAppDispatch();

  const queryParams = {
    ...filters,
    search: debouncedSearch,
  };

  const { data, isPlaceholderData, isPending } = useQuery(
    jobsDataOption(undefined, queryParams),
  );

  const jobs = data?.data.jobs || [];
  const meta = data?.data?.meta;

  return (
    <>
      <section
        id="job-table-section"
        className="space-y-4 p-4 max-sm:mb-4 md:space-y-6 md:p-6"
      >
        <Filter />

        {isPending && !isPlaceholderData ? (
          <div className="relative">
            <div className="absolute inset-y-100 flex w-full items-center justify-center">
              <p className="skeleton skeleton-text w-fit font-medium">
                Getting job data from server, please be patient...
              </p>
            </div>
          </div>
        ) : (
          <article
            className={`${isPlaceholderData ? "opacity-50" : "opacity-100"} border-base-300 bg-base-100 rounded-box border shadow-xl`}
          >
            <div className="overflow-x-auto pb-4">
              <table className="table-sm md:table-md table min-w-4xl max-sm:min-w-3xl">
                {/* table head */}
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Date Applied</th>
                    <th>Action</th>
                  </tr>
                </thead>

                {/* table body */}
                <tbody>
                  {jobs.map((job, i) => {
                    return <TableRow key={i} job={job} />;
                  })}
                </tbody>
              </table>
            </div>

            {/* table footer */}
            {meta && jobs.length > 0 ? (
              <div className="flex items-center justify-between px-4 py-3 md:px-6">
                <p className="label text-sm whitespace-normal">
                  Showing {meta.total} jobs
                </p>

                <div className="join border-base-300 rounded-full border shadow-md">
                  <button
                    type="button"
                    className="join-item btn btn-sm btn-soft"
                    disabled={!meta.hasPrevPage}
                    onClick={() => {
                      dispatch(setPrevPage());
                    }}
                  >
                    <span>
                      <ChevronLeft
                        className={`${meta.hasPrevPage ? "text-base-content" : "text-base-content/40"} size-4`}
                      />
                    </span>
                  </button>

                  <button
                    type="button"
                    className="join-item btn btn-sm btn-soft text-base-content"
                  >
                    <p>{`${meta.page} / ${meta.maxPages}`}</p>
                  </button>

                  <button
                    type="button"
                    disabled={!meta.hasNextPage}
                    className="join-item btn btn-sm btn-soft"
                    onClick={() => dispatch(setNextPage())}
                  >
                    <span>
                      <ChevronRight className="text-base-content size-4" />
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-4 py-3 text-center md:px-6">
                <p className="label text-sm whitespace-normal">
                  No data has been added yet
                </p>
              </div>
            )}
          </article>
        )}
      </section>
    </>
  );
}
