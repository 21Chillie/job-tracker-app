import { dataJobsPlaceholder } from "./dataPlaceholder";
import { TableRow } from "./TableRow";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Filter from "./Filter";
import { useAppDispatch, useAppSelector } from "~/configs/store.config";
import { useQuery } from "@tanstack/react-query";
import { jobsDataOption } from "~/hooks/job/useJobData.hook";
import { useDebounce } from "use-debounce";
import { setNextPage, setPrevPage } from "~/features/job/jobFilterSlice";

export default function JobTable() {
  const filters = useAppSelector((state) => state.jobFilter);
  const [debouncedSearch] = useDebounce(filters.search, 500);
  const dispatch = useAppDispatch();

  const queryParams = {
    ...filters,
    search: debouncedSearch,
  };

  const { data, isPlaceholderData } = useQuery(
    jobsDataOption(undefined, queryParams),
  );

  if (!data) return null;

  const { jobs, meta } = data.data;
  const { total, page, limit, maxPages, hasNextPage, hasPrevPage } = meta;

  return (
    <>
      <section
        id="job-table-section"
        className="space-y-4 p-4 max-sm:mb-4 md:space-y-6 md:p-6"
      >
        <Filter />

        <article
          className={`${isPlaceholderData ? "opacity-50" : "opacity-100"} border-base-300 bg-base-100 rounded-box border shadow-xl`}
        >
          <div className="overflow-x-auto pb-4">
            <table className="table-sm md:table-md table min-w-4xl max-sm:min-w-3xl">
              {/* table head */}
              <thead>
                <tr>
                  {/*<th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>*/}
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
                  return <TableRow key={i} {...job} />;
                })}
              </tbody>
            </table>
          </div>

          {/* TODO: change this later */}
          {jobs.length > 0 ? (
            <div className="flex items-center justify-between px-4 py-3 md:px-6">
              <p className="label text-sm whitespace-normal">
                Showing {total} jobs
              </p>

              <div className="join border-base-300 rounded-full border shadow-md">
                <button
                  type="button"
                  className="join-item btn btn-sm btn-soft"
                  disabled={!hasPrevPage}
                  onClick={() => {
                    dispatch(setPrevPage());
                  }}
                >
                  <span>
                    <ChevronLeft
                      className={`${hasPrevPage ? "text-base-content" : "text-base-content/40"} size-4`}
                    />
                  </span>
                </button>

                <button
                  type="button"
                  className="join-item btn btn-sm btn-soft text-base-content"
                >
                  <p>{`${page} / ${maxPages}`}</p>
                </button>

                <button
                  type="button"
                  disabled={!hasNextPage}
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
      </section>
    </>
  );
}
